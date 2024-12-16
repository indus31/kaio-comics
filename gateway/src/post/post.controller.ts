import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { Observable, take } from 'rxjs';
import { PostType } from './models/postType';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() post: PostType) {
    return this.postService.create(post);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Observable<PostType> {
    return this.postService.findOne(id);
  }

  @Get()
  findAll(): Observable<Array<PostType>> {
    return this.postService.findAll().pipe(take(1));
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
