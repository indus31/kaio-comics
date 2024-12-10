import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { take } from 'rxjs';
import { FileUploadService } from 'src/app/core/file-upload.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent  implements OnInit {
  public form: FormGroup = new FormGroup({})
  constructor(
    private _fileUploadService : FileUploadService,
    private _userservice: UsersService,
    private _formBuilder: FormBuilder,
    private _registration: RegistrationService,
    private _toastController: ToastController,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      username: [
        '', //default value fro the control
        [Validators.required],
      ],
      lastname:[
        '',[Validators.required],
      ],
      firstname:[
        '',[Validators.required],
      ],
      gender:[
        '',[Validators.required],
      ],
      email:[
        '',[Validators.required,Validators.email],
      ],
      password: [
        '', //default value fro the control
        [Validators.required],
      ],
      checkPassword:[
        '', //default value fro the control
        [Validators.required],
      ],
      checkCGU:[
        [Validators.required],[Validators.requiredTrue]
      ]
    });
  }
  async registrationToast(position:'top'|'middle'|'bottom',message:string){
    const toast = await this._toastController.create({
      message:message,
      duration:3000,
      position:position,
      buttons:[{text:'retry'}]
    })
    await toast.present()
    toast.onWillDismiss()
              .then(() => this.form.reset())
  }
  onSubmit(): void {
    console.log('begin submit');
    this._registration
      .registerUser(this.form.value)
      .pipe(take(1))
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            const username = this.form.value.username;
            this._userservice.findOneByUserName(username).subscribe({
              next: (user: any) => {
                const userId = user._id;
                console.log(userId + 'just before createPicture');
                this._fileUploadService.createPicture(userId).subscribe({
                  next: () => {
                    console.log('just before update user');
                    // Mise à jour de l'utilisateur avec la nouvelle URI de la photo de profil
                    user.profilePicture = 'http://localhost:3000/profile-picture/provide/' + userId;
                    this._userservice.updateUser(user).subscribe({
                      next: () => {
                        console.log('just before navigate to login');
                        this._router.navigate(['login']);
                      },
                      error: (error: any) => {
                        console.log('Error updating user:', error);
                      }
                    });
                  },
                  error: (error: any) => {
                    console.log('Error creating picture:', error);
                  }
                });
              },
              error: (error: any) => {
                console.log('Error finding user:', error);
              }
            });
          } else {
            console.log(`ko, ${JSON.stringify(response.body)}`);
            this.registrationToast('top', `${JSON.stringify(response.body)}`);
          }
        },
        error: (error: any) => {
          console.log('ko,on est pas bon', error);
        },
      });
  }
}
