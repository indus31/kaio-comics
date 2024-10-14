import { Injectable, Logger } from '@nestjs/common';
import { Users } from './model/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('Users') private usersModel: Model<Users>) {}
  async findAll(): Promise<Users[]> {
    const usersData = await this.usersModel.find();
    /*if (!internData || internData.length == 0) {
        throw new NotFoundException('Interns data not found!');
    }*/
    return usersData;
  }
  async findOne(lastname: any): Promise<Users> {
    const userData = await this.usersModel.findOne({ lastname });
    return userData;
  }
  async findByUsername(username: any): Promise<Users> {
    const userData = await this.usersModel.findOne({ username });
    Logger.log('dans le service de users : '+ JSON.stringify(userData))
    return userData;
  }
  async add(createUser: Users): Promise<Users> {
    const newUser = await new this.usersModel(createUser);
    return newUser.save();
  }

}
