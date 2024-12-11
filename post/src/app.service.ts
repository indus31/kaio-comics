import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './models/post-entity';
import { PostCategory, PostType } from './models/post.type';
import { lastValueFrom } from 'rxjs';
import { UserType } from './models/users.type';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  
  constructor(@InjectRepository(PostEntity)
  private _repository: Repository<PostEntity>,@Inject('USERS') private _client: ClientProxy){}
  getAllPosts(): Promise<any> {
    
    return this._repository
      .find({ order: { postedAt: 'DESC' } })
      .then(async (posts) => {
        const newPosts: Array<PostType> = [];
        if (posts.length != 0) {
          const pattern = { cmd: 'oneUser' };
          for (const post of posts) {
            const actualPost: PostType = {
              id: post.id,
              title: post.title,
              content: post.content,
              media: post.media,
              postedAt: post.postedAt,
              category: PostCategory[post.category],
              likes: post.likes,
              comments: post.comments,
              author: await lastValueFrom(
                this._client.send<UserType>(pattern, post.authorId),
              ),
            };

            newPosts.push(actualPost);
          }
        }
        return newPosts;
      })
      .catch((error) => Logger.log(error));
  }
}
