import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('export')
  async export(@Res() res: Response) {
    const pdfBuffer = await this.notesService.exportToPdf();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="note.pdf"');
    res.setHeader('Content-Length', String(pdfBuffer.length));

    // Dùng end() để không bị Express encode lại
    res.end(pdfBuffer);
  }
}
