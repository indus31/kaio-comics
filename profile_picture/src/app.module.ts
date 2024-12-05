import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ProfilePicture, profilePictureSchema } from './model/profile.picture.schema';
import { ProfilePictureController } from './profile-picture/profile_picture_controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Dossier de destination
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: ProfilePicture.name, schema: profilePictureSchema }]),
    DatabaseModule,
  ],
  controllers: [AppController, ProfilePictureController],
  providers: [AppService,DatabaseService],
})
export class AppModule {}
