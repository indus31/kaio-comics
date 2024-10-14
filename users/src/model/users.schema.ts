import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop()
  id?: number;
  @Prop()
  password:string;
  @Prop()
  username:string;
  @Prop()
  lastname: string;
  @Prop()
  firstname: string;
  @Prop()
  gender: string;
  @Prop()
  emails: string;
  @Prop()
  subscription?: string[]
  @Prop()
  profilePicture?: string;
  @Prop()
  frontPicture?:string;
}
export const usersSchema = SchemaFactory.createForClass(Users);
