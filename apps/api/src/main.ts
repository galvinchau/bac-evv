import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dùng port 3000 để khớp với Codespaces auto forward
  await app.listen(3000);
  console.log('[API] listening on http://localhost:3000');
}
bootstrap();
