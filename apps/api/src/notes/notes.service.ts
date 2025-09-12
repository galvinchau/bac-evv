import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as mammoth from 'mammoth';
import puppeteer from 'puppeteer';

@Injectable()
export class NotesService {
  async exportToPdf(): Promise<Buffer> {
    // Fallback HTML đề phòng template.docx bị trống/thiếu hoặc convert lỗi
    const fallbackHtml = `
      <html>
        <head><meta charset="utf-8"><title>Note (Fallback)</title></head>
        <body style="font-family: Arial, sans-serif; padding: 24px;">
          <h1>BAC-EVV — Export Preview</h1>
          <p><strong>Status:</strong> Using HTML fallback because template.docx is missing or invalid.</p>
          <p>This is a placeholder PDF. DOCX→HTML→PDF pipeline will be used when a valid template.docx is provided.</p>
        </body>
      </html>`;

    let htmlToRender = fallbackHtml;

    try {
      // 1) Load DOCX template
      const templatePath = path.join(__dirname, 'template.docx');
      const content = fs.readFileSync(templatePath, 'binary'); // sẽ throw nếu file không hợp lệ/không tồn tại

      // 2) Render DOCX với dữ liệu mẫu
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
      doc.render({ patientName: 'John Doe', dateFull: new Date().toDateString() });
      const docxBuffer = doc.getZip().generate({ type: 'nodebuffer' });

      // 3) DOCX -> HTML (mammoth)
      const { value: html } = await mammoth.convertToHtml({ arrayBuffer: docxBuffer.buffer });
      htmlToRender = `<html><head><meta charset="utf-8"><title>Note</title></head><body>${html}</body></html>`;
    } catch (e) {
      // Giữ nguyên fallbackHtml
    }

    // 4) HTML -> PDF (puppeteer)
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(htmlToRender, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdf;
  }
}
