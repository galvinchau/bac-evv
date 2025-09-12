import { Controller, Get } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get('export')
  exportPreview() {
    return { ok: true, message: 'Export preview endpoint is alive' };
  }
}
