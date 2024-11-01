import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureService } from './profile_picture.service';


@Controller('profile-picture')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Assurez-vous que le nom du champ est 'file'
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    return this.profilePictureService.uploadProfilePicture(file);
  }
}