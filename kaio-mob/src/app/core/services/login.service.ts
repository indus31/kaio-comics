import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsersService } from './users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService:UsersService) { }
  doLogin(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.login === 'admin' && credentials.password === 'admin') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: 'a.b.c' }
      }));
    }
    return this.userService.findOneByUserName(credentials.login).pipe(
      map(user => {
        console.log(JSON.stringify(user))
        console.log('mot de passe retourner par la req  :'+user.password + 'password entré : '+credentials.password)
        if ( user.password === credentials.password) {
          return new HttpResponse<any>({
            status: 200,
            body: { token: 'a.b.c' }
          });
        } else {
          return new HttpResponse<any>({
            status: 403,
            body: { message: 'failure 403' }
          });
        }
      }),
      catchError(error => {
        return of(new HttpResponse<any>({
          status: 404,
          body: { message: 'failure 404' }
        }));
      })
    );
  }
  
}
