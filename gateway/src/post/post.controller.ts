import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { Observable, take } from 'rxjs';
import { PostType } from './models/postType';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Observable<Array<PostType>> {
    return this.postService.findAll().pipe(take(1));
  }
  
}
