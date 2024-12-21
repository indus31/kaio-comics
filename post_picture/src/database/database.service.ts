import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostPicture } from 'src/model/post_picture.schema';


@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel('PostPicture')
    private readonly postPictureModel: Model<PostPicture>,
  ) {}

  async create(path: string, id_post: string): Promise<PostPicture> {
    Logger.log(path);
    const createdProfilePicture = new this.postPictureModel({ path, id_post });
    return createdProfilePicture.save();
  }

  async findAll(): Promise<PostPicture[]> {
    const allPictures = await this.postPictureModel.find();
    if(!allPictures){
      throw new NotFoundException('there is no datas to display');
    }
    return allPictures;
  }
  async getPostPictureByPostId(post_id: string): Promise<PostPicture> {
    return this.postPictureModel.findOne({ id_users:post_id }).exec();
  }
  async deletePicture(id:string):Promise<PostPicture>{
    const deletePicture = await this.postPictureModel.findByIdAndDelete(id);
    if(!deletePicture){
      throw new NotFoundException(`picture #${id} not found`);
    }
    return deletePicture;
  }
  async updateByPostId(postId: string, update: string): Promise<PostPicture> {
    return this.postPictureModel.findOneAndUpdate(
      { id_post: postId },
      { path: update },
      { new: true }
    );
  }
  
}
