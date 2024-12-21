import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
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

  @Get('scroll/:index')
  findNext(@Param('index') index: number, @Res() res: Response): void {
    this.postService
      .findNext(index)
      .pipe(take(1))
      .subscribe({
        next: (response: Array<PostType> | null) => {
          if (response) {
            res.status(HttpStatus.OK).send(response);
          } else {
            res.status(404).send();
          }
        },
        error: (error: any) => {
          res.status(500).send(error);
        },
      });
  }
}
