import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Res, StreamableFile, Delete, HttpStatus, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureService } from './profile_picture.service';
import { Response } from 'express';
import { Readable } from 'stream';
import { ProfilePictureType } from './model/ProfilePicture.type';
import { Observable, take } from 'rxjs';



@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private  profilePictureService: ProfilePictureService) {}
  @Post('create/:userId')
  createPicture(@Param() userId:string,@Res() res: Response){
    Logger.log('entering createPicture controller methods')
    return this.profilePictureService.createPicture(userId).pipe(take(1))
    .subscribe({
      next: (response: ProfilePictureType) => {  
        Logger.log(response);
        if (response) {
          Logger.log('ok for sending : '+HttpStatus.OK)
          res.status(HttpStatus.OK).send(response)
        }
        else {
          res.status(HttpStatus.BAD_REQUEST).send()
        }
      },
      error: (error: any) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
      }
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Body('userId') userId: string) {
    return this.profilePictureService.uploadProfilePicture(file, userId);
  }
  @Get('provide/:userId')
  async getProfilePictureByUserId(@Param('userId') userId: string, @Res() res: Response): Promise<void> {
    const fileBuffer = await this.profilePictureService.getProfilePictureBufferByUserId(userId);

    // Vérifiez que le buffer n'est pas vide
    if (!fileBuffer || fileBuffer.length === 0) {
      Logger.error('Buffer is empty');
      res.status(404).send('Image not found');
      return;
    }

    // Convertir le buffer en un flux lisible
    const readableStream = new Readable({
      read() {
        this.push(fileBuffer);
        this.push(null);
      }
    });

    // // Log pour vérifier le contenu du flux
    // readableStream.on('data', (chunk) => {
    //   Logger.log('Data chunk:', chunk);
    // });

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline; filename="${userId}.jpg"`);

    // Utiliser pipe pour envoyer le flux directement dans la réponse
    readableStream.pipe(res);
  }
  @Get()
  findAll():Observable<Array<ProfilePictureType>>{
    return this.profilePictureService.findAll().pipe(take(1));
  }
  @Delete(':id')
  remove(@Param('id') id:string,@Res()res:Response):void{
    this.profilePictureService.removeOne(id)
    .pipe(take(1))
    .subscribe({
      next:(response:ProfilePictureType | null)=>{
        
        if(response){
          res.status(HttpStatus.OK).send(response)
        }
        else{
          res.status(404).send()
        }
      },
      error:(error:any)=>{
        res.status(500).send(error)
      }
    })
  }
}