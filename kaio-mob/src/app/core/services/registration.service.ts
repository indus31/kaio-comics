import { Injectable } from '@angular/core';
import { UsersService } from './users/users.service';
import { UserType } from '../model/user.type';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private _userService:UsersService
  ) {}
  registerUser(user:UserType):Observable<HttpResponse<UserType>>{
    console.log(user);
    return this._userService.addUser(user).pipe(
      map(user => {
        console.log("User added successfully");
        return new HttpResponse<UserType>({
          status: 200,
          body: user
        });
      }),
      catchError(error => {
        console.log("Error adding user");
        return of(new HttpResponse<any>({
          status: 403,
          body: {message: 'failure'}
        }));
      })
    );
  }
  }  
   

