import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { ProfilePictureType } from './model/ProfilePicture.type';

@Injectable()
export class ProfilePictureService {
  constructor(
    @Inject('PROFILE_PICTURE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async uploadProfilePicture(file: Express.Multer.File, userId: string) {
    Logger.log('dans le service juste avant le send');
    if (!file ) {
      Logger.error('File is empty');
      return;
    }else{
      Logger.log('prepare to upload Profile picture of  user with  id n. ' + userId)
    }

    const fileBuffer = file.buffer; // Convertir le fichier en buffer
    const extension = file.originalname.split('.').pop(); // Obtenir l'extension de fichier d'origine
    //Logger.log('File buffer:', fileBuffer);
    Logger.log('File extension:', extension);
    Logger.log('User ID:', userId);

    return lastValueFrom(this.client.send({ cmd: 'upload' }, { file: fileBuffer.toString('base64'), extension, userId }));
  }
  async getProfilePictureBufferByUserId(userId: string): Promise<Buffer> {
    Logger.log('sending message to profile_picture');
    const profilePicture = await lastValueFrom(this.client.send({ cmd: 'getProfilePicture' }, { userId }));
    if(!profilePicture){
      Logger.error('file is empty');
      return;
    }else{
      Logger.log('receiving picture from microservice')
    }
    return Buffer.from(profilePicture.file, 'base64');
  }
  findAll():Observable<ProfilePictureType[]>{
    const pattern:any = {cmd:'allPictures'};
    return this.client.send<ProfilePictureType[]>(pattern,{});
   }
   removeOne(id:string): Observable<ProfilePictureType>{
    const pattern:any = {cmd:'removePicture'};
    return this.client.send<ProfilePictureType>(pattern,id)
   }
   createPicture(userId:string):Observable<ProfilePictureType>{
    const pattern:any = {cmd:'createPicture'};
    return this.client.send<ProfilePictureType>(pattern,userId)
   }

}