import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from "@angular/router"
import { StorageService } from "../services/storage.service"

@Injectable({
  providedIn:'root'
})
export class noLogin implements CanActivate{
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this._storageService.retrieve('auth') === null){
      console.log('storage est vide')
      return true
    }
    console.log('navigate to "" ')
    this._router.navigate([''])
    return false
  }

}