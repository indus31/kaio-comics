import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PostPictureService } from './post-picture.service';
import { PostPictureController } from './post-picture.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_PICTURE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3002,
        },
      },
    ]),
  ],
  providers: [PostPictureService],
  controllers: [PostPictureController],
})
export class PostPictureModule {}
