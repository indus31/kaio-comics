import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  public form: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    
    private _router: Router,
    private _storage: StorageService
  ) { }
  disconnect(){
    this._storage.remove('auth')
    this._router.navigate(['login'])
    console.log('session disconnected')
    this.form.value === ''
  }
}