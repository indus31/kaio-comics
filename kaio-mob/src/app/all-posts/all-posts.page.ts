import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../core/services/log-out.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AddPostComponent } from './components/add-post/add-post.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage {
  constructor(private _modalCtrl: ModalController, private _modalController: ModalController) { }
  ngOnInit() {}
  async dismiss() {
    await this._modalController.dismiss();
  }

  async showAddPost() {
    const newModalId = 'addPost';
    const modal = await this._modalCtrl.create({
      component: AddPostComponent,
      id: newModalId,
      
    });
    
    modal.present();
  }
}
