
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public form: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _toastController: ToastController,
    private _router: Router,
    private _storage: StorageService
  ) {}
  async loginToast(position:'top'|'middle'|'bottom',message:string){
    const toast = await this._toastController.create({
      message:message,
      duration:2000,
      position:position,
      buttons:[{text:'retry'}]
    })
    await toast.present()
    toast.onWillDismiss()
              .then(() => this.form.reset())
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      login: [
        '', //default value fro the control
        [Validators.required],
      ],
      password: [
        '', //default value fro the control
        [Validators.required],
      ],
    });
  }
  onSubmit(): void {
    this._service
      .doLogin(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            this._storage.store('auth',response.body.token)
            console.log('just before navigate')
            this._router.navigate(['home','posts'])
          } else {
            console.log(`ko, ${JSON.stringify(response.body)}`);
            this.loginToast('top',`${JSON.stringify(response.body)}`)
          }
        },
        error: (error: any) => {
          console.log('ko,on est pas bon');
        },
      });
  }
  disconnect(){
    this._storage.remove('auth')
    this._router.navigate(['login'])
    this.form.value === ''
  }
}
