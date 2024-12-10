import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfilePictureDto {
    @IsString()
    _id:string
    @IsString()
    @IsNotEmpty()
    readonly path: string;
    @IsString()
    @IsNotEmpty()
    readonly id_users: string;
}