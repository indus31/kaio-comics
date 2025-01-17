import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DatabaseService } from 'src/database/database.service';

@Controller()
export class DatabaseController {
  
  constructor(private databaseService:DatabaseService){}

  @MessagePattern({ cmd: 'createPostPicture' })
  async createPicture(@Payload() payload :{postId:string,path:string}){
    Logger.log("starting process to create document post_picture")
    
   const newPic = await this.databaseService.create(payload.path,payload.postId);
   Logger.log(newPic)
    return {message : 'create successfully'}
  }
  @MessagePattern({ cmd: 'uploadPostPicture' })
  async uploadFile(@Payload() payload: { file: string, extension: string, postId: string }) {
    // Convertir le fichier en buffer
    const fileBuffer = Buffer.from(payload.file, 'base64');

    const randomFileName = Math.floor(100000 + Math.random() * 900000).toString();

    const filePath = join(process.cwd(), 'post_media', `${randomFileName}.${payload.extension}`);
    //await this.deleteOldImage(payload.postId);
    writeFileSync(filePath, fileBuffer);
    Logger.log('File uploaded successfully');
   
    Logger.log(`User ID: ${payload.postId}`);
    Logger.log(`filepath : ${filePath}`)
    Logger.log('juste before create a new post picture in db')
    await this.databaseService.create( filePath,payload.postId);

    return { message: 'File uploaded successfully', path: filePath, postId: payload.postId };
  }
  

  @MessagePattern({ cmd: 'getPostPicture' })
  async getPostPictureByPostId(@Payload() payload: { postId: string }) {
    Logger.log('receiving from the gateway');
    const postPicture = await this.databaseService.getPostPictureByPostId(payload.postId);
    Logger.log('id : ', payload.postId)
    Logger.log(postPicture);
    if (!postPicture) {
      Logger.log('id : ', payload.postId);
      throw new Error('Post picture not found');
    }
    const filePath = postPicture.path;
    if(!filePath){
      throw new Error('Path picture not found');
    }
    Logger.log(filePath)
    const fileBuffer = readFileSync(filePath);
    if(!fileBuffer){
      throw new Error('file buffer error');
    }
    Logger.log('file found')
    return { file: fileBuffer.toString('base64'), extension: filePath.split('.').pop() };
  }
  
  @MessagePattern({cmd:'allPostsPictures'})
  async findAll(){
    const pictureData = await this.databaseService.findAll();
    return pictureData;
  }
  @MessagePattern({cmd:'removePostPicture'})
  async removePicture(id:string){
    return this.databaseService.deletePicture(id);
  }

  async deleteOldImage(postId: string) {
    const oldImage = await this.databaseService.getPostPictureByPostId(postId);
    if (oldImage && oldImage.path) {
      // Test si oldImage.path est égal à 'asset/avatar.png'
      if (oldImage.path == 'asset/avatar.png') {
        Logger.log('Old image path is the default avatar. No need to delete.');
        return; // Arrête la méthode
      }

      try {
        unlinkSync(oldImage.path);
        Logger.log(`Old image deleted: ${oldImage.path}`);
      } catch (error) {
        Logger.error(`Error deleting old image: ${error.message}`);
      }
    }
  }
}