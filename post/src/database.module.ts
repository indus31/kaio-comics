import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostEntity } from './models/post-entity';


const envfile = 'env/' + process.env.EXEC_MODE;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envfile,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        type: _configService.get<any>('DB_TYPE'),
        host: _configService.get<string>('DB_HOST'),
        port: _configService.get<number>('DB_PORT'),
        username: _configService.get<string>('DB_USER'),
        password: _configService.get<string>('DB_PASSWORD'),
        database: _configService.get<string>('DB_DATABASE'),
        synchronize: _configService.get<boolean>('ORM_OPTIONS_SYNC'),
        entities: [PostEntity],
      }),
    }),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  exports: [TypeOrmModule],
})
export class ConnectModule {}