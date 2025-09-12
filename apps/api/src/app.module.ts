import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { NotesController } from "./notes/notes.controller";

@Module({
  controllers: [HealthController, NotesController],
  providers: [],
})
export class AppModule {}
