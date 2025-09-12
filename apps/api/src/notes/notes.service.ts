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
    // 1) Load DOCX template (tạm thời đọc từ src để preview)
    const templatePath = path.join(__dirname, 'template.docx');
    const content = fs.readFileSync(templatePath, 'binary');

    // 2) Render DOCX với dữ liệu mẫu (sẽ thay bằng dữ liệu thật sau)
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.render({ patientName: 'John Doe', dateFull: new Date().toDateString() });
    const docxBuffer = doc.getZip().generate({ type: 'nodebuffer' });

    // 3) DOCX -> HTML (mammoth)
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer: docxBuffer.buffer });

    // 4) HTML -> PDF (puppeteer)
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(
      `<html><head><meta charset="utf-8"><title>Note</title></head><body>${html}</body></html>`,
      { waitUntil: 'networkidle0' },
    );
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdf;
  }
}
