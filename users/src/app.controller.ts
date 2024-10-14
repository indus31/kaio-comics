import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Users } from './model/users.schema';

@Controller('api/v1/users')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'allUsers' })
  async findAll(): Promise<Users[]> {
    return await this.appService.findAll();
  }
  @MessagePattern({ cmd: 'oneUser' })
  async findOne(@Payload() payload: any): Promise<Users> {
    return await this.appService.findOne(payload);
  }
  @MessagePattern({ cmd: 'findByUsername' })
  async findByUsername(@Payload() payload: any): Promise<Users> {
    await Logger.log('dans le controller de users : '+JSON.stringify(this.appService.findByUsername(payload)))
    return await this.appService.findByUsername(payload);
  }
  @MessagePattern({ cmd: 'addUser' })
  async addUser(user: Users): Promise<Users> {
    const newUser = this.appService.add(user);
    return newUser;
  }
}
