import { Injectable } from '@nestjs/common';
import { CreatePostPictureDto } from './dto/create-post-picture.dto';
import { UpdatePostPictureDto } from './dto/update-post-picture.dto';

@Injectable()
export class PostPictureService {
  create(createPostPictureDto: CreatePostPictureDto) {
    return 'This action adds a new postPicture';
  }

  findAll() {
    return `This action returns all postPicture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postPicture`;
  }

  update(id: number, updatePostPictureDto: UpdatePostPictureDto) {
    return `This action updates a #${id} postPicture`;
  }

  remove(id: number) {
    return `This action removes a #${id} postPicture`;
  }
}
