import {  Inject,Injectable, Logger } from '@nestjs/common';
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
  findByUsername(username: string): Observable<UserType> {
    const pattern: any = { cmd: 'findByUsername' };
   // Logger.log('dans le service de la gateway :'+JSON.stringify(this._client.send<UserType>(pattern, username)))
    return this._client.send<UserType>(pattern, username);
  }
  findOneById(id:string):Observable<UserType>{
    const pattern : any = {cmd:'findById'};
    Logger.log('dans le service de la gateway :'+JSON.stringify(this._client.send<UserType>(pattern, id)))
    return this._client.send<UserType>(pattern,id);
  }
  add(data): Observable<UserType> {
    const pattern: any = { cmd: 'addUser' };
    return this._client.send<UserType>(pattern, data);
  }
  update(id:string,updateUser:UserType):Observable<UserType>{
    const pattern: any = { cmd: 'updateUser' };
    return this._client.send<UserType>(pattern, { id, updateUser });
  }
}
