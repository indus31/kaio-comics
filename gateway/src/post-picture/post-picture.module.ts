import { Module } from '@nestjs/common';
import { PostPictureService } from './post-picture.service';
import { PostPictureController } from './post-picture.controller';

@Module({
  controllers: [PostPictureController],
  providers: [PostPictureService],
})
export class PostPictureModule {}
