import { Component, OnInit } from '@angular/core';
import { UpdateProfilePictureComponent } from '../../update-profile-picture/update-profile-picture.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss'],
})
export class ChangePictureComponent  implements OnInit {

  constructor(private _modalCtrl: ModalController, private _modalController: ModalController) { }

  ngOnInit() {}
  async dismiss() {
    await this._modalController.dismiss();
  }

  async showChangeProfilePicture() {
    const newModalId = 'update-profile-picture';
    const modal = await this._modalCtrl.create({
      component: UpdateProfilePictureComponent,
      id: newModalId,
      
    });
    
    modal.present();
  }
}
