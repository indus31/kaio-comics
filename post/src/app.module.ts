import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from './database.module';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'USERS',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3100,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
