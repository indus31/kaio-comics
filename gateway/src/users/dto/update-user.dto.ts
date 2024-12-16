import { IsString, IsOptional, IsArray, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class UserTypeDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  lastname: string;

  @IsString()
  firstname: string;

  @IsString()
  gender: string;

  @IsEmail()
  emails: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subscription?: string[];

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  frontPicture?: string;
}
