import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Multer } from 'multer';

@Controller()
export class ProfilePictureController {
  @MessagePattern('upload_file')
  async uploadFile(@Payload() file: Multer.File) {
    // Enregistrer le chemin du fichier dans la base de données de l'utilisateur
    // ...
    return { message: 'File uploaded successfully', path: file.path };
  }
}
