import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Observable } from 'rxjs';
import { PostType } from './models/postType';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST') private _client: ClientProxy
  ) {}
  findAll(): Observable<Array<PostType>> {
    const pattern: any = { cmd: 'allPost' };
    return this._client.send<Array<PostType>>(pattern, {});
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
