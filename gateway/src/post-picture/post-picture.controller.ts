import { Controller, Post, UseInterceptors, UploadedFile, Body, Param, Get, Res, StreamableFile, Delete, HttpStatus, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { Readable } from 'stream';

import { Observable, take } from 'rxjs';
import { PostPictureType } from './entities/post-picture.type';
import { PostPictureService } from './post-picture.service';



@Controller('post-picture')
export class PostPictureController {
  constructor(private  postPictureService: PostPictureService) {}
  @Post('create/:postId')
  createPicture(@Param() postId:string,@Res() res: Response){
    //Logger.log('entering createPicture controller methods')
    return this.postPictureService.createPicture(postId).pipe(take(1))
    .subscribe({
      next: (response: PostPictureType) => {  
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
  async uploadPostPicture(@UploadedFile() file: Express.Multer.File, @Body('postId') postId: string) {
    return this.postPictureService.uploadPostPicture(file, postId);
  }
  @Get('provide/:postId')
  async getPostPictureByPostId(@Param('postId') postId: string, @Res() res: Response): Promise<void> {
    const fileBuffer = await this.postPictureService.getPostPictureBufferByPostId(postId);

    // Vérifiez que le buffer n'est pas vide
    if (!fileBuffer || fileBuffer.length === 0) {
      Logger.error('Buffer is empty');
      res.status(404).send('Post Image not found');
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
    res.setHeader('Content-Disposition', `inline; filename="${postId}.jpg"`);

    // Utiliser pipe pour envoyer le flux directement dans la réponse
    readableStream.pipe(res);
  }
  @Get()
  findAll():Observable<Array<PostPictureType>>{
    return this.postPictureService.findAll().pipe(take(1));
  }
  @Delete(':id')
  remove(@Param('id') id:string,@Res()res:Response):void{
    this.postPictureService.removeOne(id)
    .pipe(take(1))
    .subscribe({
      next:(response:PostPictureType | null)=>{
        
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
