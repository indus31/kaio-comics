import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Créer le dossier de destination s'il n'existe pas
  const uploadsPath = path.join(__dirname, 'post_media');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
    },
  });

  await app.listen();
}
bootstrap();
