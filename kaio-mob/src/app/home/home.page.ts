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
  
}
