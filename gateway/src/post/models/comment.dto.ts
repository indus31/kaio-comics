import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentTypeDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsDate()
  @Type(() => Date)
  postedAt: Date;
}