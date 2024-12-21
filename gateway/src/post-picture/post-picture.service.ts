import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

import { PostPictureType } from './entities/post-picture.type';

@Injectable()
export class PostPictureService {
  constructor(
    @Inject('POST_PICTURE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async uploadPostPicture(file: Express.Multer.File, postId: string) {
    Logger.log('dans le service juste avant le send');
    if (!file ) {
      Logger.error('File is empty');
      return;
    }else{
      Logger.log('prepare to upload Post picture of  user with  id n. ' + postId)
    }

    const fileBuffer = file.buffer; // Convertir le fichier en buffer
    const extension = file.originalname.split('.').pop(); // Obtenir l'extension de fichier d'origine
    //Logger.log('File buffer:', fileBuffer);
    Logger.log('File extension:', extension);
    Logger.log('Post ID:', postId);

    return lastValueFrom(this.client.send({ cmd: 'upload' }, { file: fileBuffer.toString('base64'), extension, postId }));
  }
  async getPostPictureBufferByPostId(postId: string): Promise<Buffer> {
    Logger.log('sending message to post_picture');
    const postPicture = await lastValueFrom(this.client.send({ cmd: 'getPostPicture' }, { postId }));
    if(!postPicture){
      Logger.error('file is empty');
      return;
    }else{
      Logger.log('receiving picture from microservice')
    }
    return Buffer.from(postPicture.file, 'base64');
  }
  findAll():Observable<PostPictureType[]>{
    const pattern:any = {cmd:'allPictures'};
    return this.client.send<PostPictureType[]>(pattern,{});
   }
   removeOne(id:string): Observable<PostPictureType>{
    const pattern:any = {cmd:'removePicture'};
    return this.client.send<PostPictureType>(pattern,id)
   }
   createPicture(postId:string):Observable<PostPictureType>{
    const pattern:any = {cmd:'createPicture'};
    return this.client.send<PostPictureType>(pattern,postId)
   }

}
