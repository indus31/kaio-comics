import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PostCategory } from '../models/postType';
import { UserType } from 'src/users/model/user.type';
import { CommentType } from '../models/commentType';
import { UserTypeDto } from 'src/users/dto/update-user.dto';
import { CommentTypeDto } from '../models/comment.dto';


export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  media?: string;

  @IsOptional()
  @IsEnum(PostCategory)
  category?: PostCategory;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserTypeDto)
  likes?: UserType[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentTypeDto)
  comments?: CommentType[];
}