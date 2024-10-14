import { Expose } from "class-transformer";


export class User{
   
    @Expose()
    id:number;
    @Expose()
    password:string;
    @Expose()
    lastname:string;
    @Expose()
    firstname:string;
    @Expose()
    gender:string;
    @Expose()
    emails:string;
    @Expose()
    subscription?:string[]
    @Expose()
    profilePicture:string;
    @Expose()
    frontPicture:string;
     constructor(
        id:number,
        password:string,
        lastname:string,
        firstname:string,
        gender:string,
        emails:string,
        profilePicture:string,
        frontPicture:string
    ){
        this.id = id;
        this.password = password;
        this.lastname = lastname;
        this.firstname = firstname;
        this.gender = gender;
        this.emails = emails;
        this.profilePicture = profilePicture;
        this.frontPicture = frontPicture;
    }
}