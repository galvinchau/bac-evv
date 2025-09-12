import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "./common/common.module";
import { HealthController } from "./health.controller";
import { S3Controller } from "./s3.controller";
import { NotesController } from "./notes/notes.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
  ],
  controllers: [HealthController, S3Controller, NotesController],
  providers: [],
})
export class AppModule {}
