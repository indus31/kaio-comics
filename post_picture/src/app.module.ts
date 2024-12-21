import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { PostPicture, postPictureSchema } from './model/post_picture.schema';
import { DatabaseController } from './database/database.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './post_media', // Dossier de destination
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    MongooseModule.forFeature([{ name: PostPicture.name, schema: postPictureSchema }]),
    DatabaseModule,
  ],
  controllers: [AppController,DatabaseController],
  providers: [AppService,DatabaseService],
})
export class AppModule {}