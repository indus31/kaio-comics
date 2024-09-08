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
}
