import { Component } from '@angular/core';
import { LogoutService } from '../core/services/log-out.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private _logOutService: LogoutService,
    private alertController: AlertController
  ) {}
  disconnect() {
    this._logOutService.disconnect();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header:
        'Etes-vous sur de vouloir quitter cette application de ouf malade !',
      subHeader: "t'es dingue?",
      message: 'se deconnecter ?',
      buttons: this.buttons,
    });

    await alert.present();
  }
  public buttons = [
    {
      text: 'non',
      role: 'cancel',
      handler: () => {
        console.log('il reste !!');
      },
    },
    {
      text: 'oui',
      role: 'confirm',
      handler: () => {
        this.disconnect();
      },
    },
  ];
}
