import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  async getUsers(id:any): Promise<Users>{
    const existingUser = await this.usersModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`Intern #${id} not found`);
    }
    return existingUser;
  }
  async add(createUser: Users): Promise<Users> {
    const newUser = await new this.usersModel(createUser);
    return newUser.save();
  }
  async update(id:any,updateUser):Promise<Users>{
    const existingUser = await this.usersModel.findByIdAndUpdate(id, updateUser, { new: true });
    if (!existingUser) {
        throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

}
