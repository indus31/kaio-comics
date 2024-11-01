import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProfilePictureService {
  constructor(
    @Inject('PROFILE_PICTURE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async uploadProfilePicture(file: Express.Multer.File) {
    Logger.log('dans le service juste avant le send');
    Logger.log(file);
    const fileBuffer = file.buffer; // Convertir le fichier en buffer
    const extension = file.originalname.split('.').pop(); // Obtenir l'extension de fichier d'origine
    Logger.log('File buffer:', fileBuffer);
    Logger.log('File extension:', extension);
    return lastValueFrom(this.client.send({ cmd: 'upload' }, { file: fileBuffer.toString('base64'), extension }));
  }
}