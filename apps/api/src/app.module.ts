import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
