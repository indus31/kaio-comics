
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this._storageService.retrieve('auth')){
      console.log('token find and retrieve')
      return true
    }
    console.log('navigate to login')
    this._router.navigate(['/','login'])
    return false
  }

}