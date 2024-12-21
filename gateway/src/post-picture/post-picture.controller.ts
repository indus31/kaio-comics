import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostPictureService } from './post-picture.service';
import { CreatePostPictureDto } from './dto/create-post-picture.dto';
import { UpdatePostPictureDto } from './dto/update-post-picture.dto';

@Controller('post-picture')
export class PostPictureController {
  constructor(private readonly postPictureService: PostPictureService) {}

  @Post()
  create(@Body() createPostPictureDto: CreatePostPictureDto) {
    return this.postPictureService.create(createPostPictureDto);
  }

  @Get()
  findAll() {
    return this.postPictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postPictureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostPictureDto: UpdatePostPictureDto) {
    return this.postPictureService.update(+id, updatePostPictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postPictureService.remove(+id);
  }
}
