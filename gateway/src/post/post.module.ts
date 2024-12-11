import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
//import { JwtService } from '@nestjs/jwt';
//import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    ClientsModule.register([
      {
        name: 'POST',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3200,
        },
      },
    ]),
    //AuthModule,
  ],
})
export class PostModule {}
