import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop()
  id?: number;
  @Prop()
  lastname: string;
  @Prop()
  firstname: string;
  @Prop()
  gender: string;
  @Prop()
  emails: string;
  @Prop()
  telephone: string;
}
export const usersSchema = SchemaFactory.createForClass(Users);
