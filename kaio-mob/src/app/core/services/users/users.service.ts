import { Injectable } from '@angular/core';
import { UserType } from '../../model/user.type';
import { HttpClient } from '@angular/common/http';
import { plainToInstance } from 'class-transformer';
import { User } from '../../model/user.class';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: UserType[] = []
  private readonly URI: string = 'http://localhost:3000/users'

  constructor(private _client: HttpClient) { }
  public findAll(): Observable<Array<UserType>>{
    return this._client.get<Array<UserType>>(this.URI)
    .pipe(map(data => plainToInstance(User,data)))
  }
  public findOneByUserName(data:string):Observable<UserType>{
    return this._client.get<UserType>(this.URI+'/username/'+ data).pipe(map(data=> plainToInstance(User,data)));
  }

  addUser(user:UserType):Observable<UserType>{
    return this._client.post<UserType>(this.URI,user);
  }
  public findOneBy(data:string):Observable<UserType>{
    //console.log("id retiré depuis storage : "+ data)
    const user =  this._client.get<UserType>(this.URI+'/'+data).pipe(map(data=> plainToInstance(User,data)))
    //console.log(JSON.stringify(user))
    return user
  }
  updateUser(user: UserType): Observable<UserType> {
    return this._client.put<UserType>(`${this.URI}/${user._id}`, user);
  }
  
}
