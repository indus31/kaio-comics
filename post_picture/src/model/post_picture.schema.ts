import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class PostPicture{
   
    @Prop()
    path:string;
    @Prop()
    id_post:string;
  
}
export const postPictureSchema = SchemaFactory.createForClass(PostPicture);