import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from 'src/model/users.schema';

const envfile = 'env/' + process.env.NEST_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envfile,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        uri: _configService.get<string>('DATABASE_URI'),
        dbName: _configService.get<string>('DATABASE_NAME'),
      }),
    }),
    MongooseModule.forFeature([{ name: 'Users', schema: usersSchema }]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
