import { Module } from '@nestjs/common';
import { ProfilePictureController } from './profile_picture_controller';


@Module({
  controllers: [ProfilePictureController],
})
export class ProfilePictureModule {}
