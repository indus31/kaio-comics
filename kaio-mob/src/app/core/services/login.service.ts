import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UsersService } from './users/users.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService:UsersService,private storageService:StorageService) { }
  doLogin(credentials: any): Observable<HttpResponse<any>> {
    if (credentials.login === 'admin' && credentials.password === 'admin') {
      return of(new HttpResponse<any>({
        status: 200,
        body: { token: 'a.b.c' }
      }));
    }
    return this.userService.findOneByUserName(credentials.login).pipe(
      map(user => {
        const dataJson = JSON.stringify(user)
        const id = JSON.stringify(user._id)
        console.log('creating session for : '+credentials.login+' '+id)
        //console.log(dataJson)
        this.storageService.store('session',[user._id]);
        this.storageService.store('userNameSession',[user.username]);
        console.log('storing session informations')
        // console.log("recupération de l'id par le stockage : "+ this.storageService.retrieve('session'))
        // console.log('mot de passe retourner par la req  : '+user.password + ' password entré : '+credentials.password)
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
