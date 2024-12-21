import { PartialType } from '@nestjs/mapped-types';
import { CreatePostPictureDto } from './create-post-picture.dto';

export class UpdatePostPictureDto extends PartialType(CreatePostPictureDto) {}
