import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Listen on all interfaces so GitHub Codespaces proxy có thể forward
  await app.listen(3000, '0.0.0.0');
  console.log('[API] listening on http://0.0.0.0:3000');
}
bootstrap();
