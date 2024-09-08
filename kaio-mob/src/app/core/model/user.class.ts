import { Expose } from "class-transformer";


export class User{
   
    @Expose()
    id:number;
    @Expose()
    lastname:string;
    @Expose()
    firstname:string;
    @Expose()
    gender:string;
    @Expose()
    emails:string;
    @Expose()
    telephone:string;
     constructor(
        id:number,
        lastname:string,
        firstname:string,
        gender:string,
        emails:string,
        telephone:string,
    ){
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.gender = gender;
        this.emails = emails;
        this.telephone = telephone;
    }
}