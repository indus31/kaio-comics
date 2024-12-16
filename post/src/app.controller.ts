import { Body, Controller, Logger, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostType } from './models/post.type';
import { PostEntity } from './models/post-entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern({ cmd: 'createPost' })
  create(
    @Payload() feedbackData: PostType,
  ): Promise<PostEntity> {
    return this.appService.insertPost(feedbackData);
  }
  @MessagePattern({ cmd: 'findOnePost' })
  async findOne(@Payload() payload: { id: string }): Promise<PostType> {
    const id: string = payload.id;
    Logger.log(id);
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'allPost' })
  findAll(): Promise<Array<PostType>> {
    return this.appService.getAllPosts();
  }
 
  @MessagePattern({ cmd: 'updatePost' })
  async updatePost(@Payload() payload: { id: string; updatePost: PostType }): Promise<PostEntity> {
    const id :string= payload.id
    const  updatePost = payload.updatePost;
    Logger.log(id)
    Logger.log(updatePost)
    return this.appService.updatePost(id, updatePost);
  }
 
  @MessagePattern({ cmd: 'removePost' })
  async deletePost(@Payload() id: string) {
    return this.appService.removePost(id);
  }
}
