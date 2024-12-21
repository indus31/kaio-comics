import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilePictureModule } from './profile_picture/profile_picture.module';
import { PostModule } from './post/post.module';
import { PostPictureModule } from './post-picture/post-picture.module';


@Module({
  imports: [UsersModule, ProfilePictureModule, PostModule, PostPictureModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
