import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserType } from './model/user.type';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private _client: ClientProxy) {}
  findAll(): Observable<Array<UserType>> {
    const pattern: any = { cmd: 'allUsers' };
    return this._client.send<UserType[]>(pattern, {});
  }
  findOne(lastname: string): Observable<UserType> {
    const pattern: any = { cmd: 'oneUser' };
    return this._client.send<UserType>(pattern, lastname);
  }
  add(data): Observable<UserType> {
    const pattern: any = { cmd: 'addUser' };
    return this._client.send<UserType>(pattern, data);
  }
}
