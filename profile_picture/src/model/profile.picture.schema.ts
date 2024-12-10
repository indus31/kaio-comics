import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class ProfilePicture{
   
    @Prop()
    path:string;
    @Prop()
    id_users:string;
  
}
export const profilePictureSchema = SchemaFactory.createForClass(ProfilePicture);
