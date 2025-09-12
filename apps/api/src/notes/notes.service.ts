import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class NotesService {
  async exportToPdf(): Promise<Buffer> {
    const html = `
      <html>
        <head><meta charset="utf-8"><title>Note Preview</title></head>
        <body style="font-family: Arial, sans-serif; padding: 40px;">
          <h1>BAC-EVV — Export Preview</h1>
          <p>This is a stable test PDF generated via Puppeteer.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return pdf;
  }
}
