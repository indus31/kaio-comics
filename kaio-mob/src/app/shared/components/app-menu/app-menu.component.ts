import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LogoutService } from 'src/app/core/services/log-out.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent  implements OnInit {
  ngOnInit() {}
  isMenuOpen = false;
  menu = document.querySelector("#menu")
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;

  }
  constructor(
    private _logOutService: LogoutService,
    private alertController: AlertController,
    private elementRef: ElementRef
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
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
