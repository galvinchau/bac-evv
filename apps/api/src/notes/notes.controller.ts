import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('export')
  async export(@Res() res: Response) {
    const pdfBuffer = await this.notesService.exportToPdf();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="note.pdf"',
    });
    res.send(pdfBuffer);
  }
}
