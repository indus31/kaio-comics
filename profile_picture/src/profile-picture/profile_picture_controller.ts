import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { DatabaseService } from 'src/database/database.service';

@Controller()
export class ProfilePictureController {
  
  constructor(private databaseService:DatabaseService){}

  @MessagePattern({ cmd: 'createPicture' })
  async createPicture(@Payload() payload :{userId:string}){
    Logger.log("starting process to create document")
    const path:string = 'asset/avatar.png';
   const newPic = await this.databaseService.create(path,payload.userId);
   Logger.log(newPic)
    return {message : 'create successfully'}
  }
  @MessagePattern({ cmd: 'upload' })
  async uploadFile(@Payload() payload: { file: string, extension: string, userId: string }) {
    // Convertir le fichier en buffer
    const fileBuffer = Buffer.from(payload.file, 'base64');

    const randomFileName = Math.floor(100000 + Math.random() * 900000).toString();

    const filePath = join(process.cwd(), 'uploads', `${randomFileName}.${payload.extension}`);
    await this.deleteOldImage(payload.userId);
    writeFileSync(filePath, fileBuffer);
    Logger.log('File uploaded successfully');
   
    Logger.log(`User ID: ${payload.userId}`);
    Logger.log(`filepath : ${filePath}`)
    await this.databaseService.updateByUserId(payload.userId, filePath);

    return { message: 'File uploaded successfully', path: filePath, userId: payload.userId };
  }
  

  @MessagePattern({ cmd: 'getProfilePicture' })
  async getProfilePictureByUserId(@Payload() payload: { userId: string }) {
    Logger.log('receiving from the gateway');
    const profilePicture = await this.databaseService.getProfilePictureByUserId(payload.userId);
    Logger.log('id : ', payload.userId)
    Logger.log(profilePicture);
    if (!profilePicture) {
      Logger.log('id : ', payload.userId);
      throw new Error('Profile picture not found');
    }
    const filePath = profilePicture.path;
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
  @MessagePattern({cmd:'allPictures'})
  async findAll(){
    const pictureData = await this.databaseService.findAll();
    return pictureData;
  }
  @MessagePattern({cmd:'removePicture'})
  async removePicture(id:string){
    return this.databaseService.deletePicture(id);
  }

  async deleteOldImage(userId: string) {
    const oldImage = await this.databaseService.getProfilePictureByUserId(userId);
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

//TODOS
//I.compress file before adding it to uploads directory

//II.add a method to serve an image done

//III.store file image path into a database with an id of users attached DONE

//IV. manage extensions file DONE !!!!