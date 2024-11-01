import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProfilePictureService } from './profile_picture.service';
import { ProfilePictureController } from './profile_picture.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_PICTURE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [ProfilePictureService],
  controllers: [ProfilePictureController],
})
export class ProfilePictureModule {}