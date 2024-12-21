import { Inject, Injectable, Logger } from '@nestjs/common';

import { UpdatePostDto } from './dto/update-post.dto';
import { Observable } from 'rxjs';
import { PostType } from './models/postType';
import { ClientProxy, Payload } from '@nestjs/microservices';


@Injectable()
export class PostService {
  constructor(
    @Inject('POST') private _client: ClientProxy
  ) {}
  findAll(): Observable<Array<PostType>> {
    const pattern: any = { cmd: 'allPost' };
    return this._client.send<Array<PostType>>(pattern, {});
  }

  create(
    post: PostType,
  ): Observable<PostType> {
    const pattern: any = { cmd: 'createPost' };
    return this._client.send<PostType>(
      pattern,
      post,
    );
  }

  findOne(id: string): Observable<PostType> {
    const pattern: any = { cmd: 'findOnePost' };
    const payload: any = { id: id };
    Logger.log(payload);
    return this._client.send<PostType>(pattern, payload);
  }
  
  update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Observable<UpdatePostDto> {
    const pattern: any = { cmd: 'updatePost' };
    const payload: any = { id: id, updatePost: updatePostDto };
    Logger.log(payload)
    return this._client.send<UpdatePostDto>(pattern, payload);
  }
  
  remove(id: string): Observable<UpdatePostDto> {
    const pattern: any = { cmd: 'removePost' };
    return this._client.send<UpdatePostDto>(pattern, id);
  }
  findNext(index: number): Observable<Array<PostType>> {
    const pattern: any = { cmd: 'nextPost' };
    return this._client.send<Array<PostType>>(pattern, index);
  }
}
