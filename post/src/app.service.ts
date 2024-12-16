import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async insertPost(
    postData: PostType,
  ): Promise<PostEntity> {
    try {
      Logger.log("creating datas")
      Logger.log(postData)
      const result = await this._repository.insert(postData);
      const insertedId = result.identifiers[0].id;
      const savedPost = await this._repository.findOne({
        where: { id: insertedId },
      });
      Logger.log('return result' + savedPost)
      return savedPost;
    } catch (error) {
      Logger.log(error);
    }
  }
  async findOne(id: string): Promise<PostType> {
    try {
      const post = await this._repository.findOne({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      const pattern = { cmd: 'oneUser' };
      const author = await lastValueFrom(this._client.send<UserType>(pattern, post.authorId));

      const actualPost: PostType = {
        id: post.id,
        title: post.title,
        content: post.content,
        media: post.media,
        postedAt: post.postedAt,
        category: PostCategory[post.category],
        likes: post.likes,
        comments: post.comments,
        author: author,
      };

      return actualPost;
    } catch (error) {
      Logger.log(error);
      throw new Error(`Failed to retrieve post: ${error.message}`);
    }
  }
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

  async updatePost(id: string, updatePost:Partial<PostEntity>): Promise<PostEntity> {
    try {
      const post = await this._repository.findOne({ where: { id } });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      Logger.log(post);
      Logger.log(id)
      Logger.log(updatePost)
      this._repository.update({id:id},updatePost);
      return {...post,...updatePost};
      
    } catch (error) {
      Logger.log('catching error....')

      throw new Error(`Failed to update post: ${error.message}`);
    }
  }
  
  removePost(id: string): Promise<PostEntity> {
    const feedback = this._repository.findOne({
      where: { id: id },
    });

    this._repository.delete({ id: id });
    
    return feedback;
  }
}
