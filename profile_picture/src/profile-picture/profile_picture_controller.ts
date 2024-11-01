import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class ProfilePictureController {
  @MessagePattern({ cmd: 'upload' })
  async uploadFile(@Payload() payload: { file: string,extension: string }) {
    // Convertir le fichier en buffer
    const fileBuffer = Buffer.from(payload.file, 'base64');

    const randomFileName = Math.floor(100000 + Math.random() * 900000).toString();

    // Enregistrer le fichier dans le dossier uploads
    const filePath = join(process.cwd(), 'uploads', `${randomFileName}.${payload.extension}`);
    writeFileSync(filePath, fileBuffer);
    Logger.log('File uploaded successfully');
    return { message: 'File uploaded successfully', path: filePath };
  }
}

//TODOS
//I.compress file before adding it to uploads directory

//II.add a method to serve an image

//III.store file image path into a database with an id of users attached

//IV. manage extensions file DONE !!!!