import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilePictureModule } from './profile-picture/profile-picture.module';


@Module({
  imports: [ProfilePictureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
