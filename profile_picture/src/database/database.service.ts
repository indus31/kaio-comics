import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfilePicture } from 'src/model/profile.picture.schema';
import { CreateProfilePictureDto } from 'src/model/profile_picture.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('ProfilePicture')
    private readonly profilePictureModel: Model<ProfilePicture>,
  ) {}

  async create(path: string, id_users: string): Promise<ProfilePicture> {
    Logger.log(path);
    const createdProfilePicture = new this.profilePictureModel({ path, id_users });
    return createdProfilePicture.save();
  }

  async findAll(): Promise<ProfilePicture[]> {
    const allPictures = await this.profilePictureModel.find();
    if(!allPictures){
      throw new NotFoundException('there is no datas to display');
    }
    return allPictures;
  }
  async getProfilePictureByUserId(users_id: string): Promise<ProfilePicture> {
    return this.profilePictureModel.findOne({ id_users:users_id }).exec();
  }
  async deletePicture(id:string):Promise<ProfilePicture>{
    const deletePicture = await this.profilePictureModel.findByIdAndDelete(id);
    if(!deletePicture){
      throw new NotFoundException(`picture #${id} not found`);
    }
    return deletePicture;
  }
  
  
}
