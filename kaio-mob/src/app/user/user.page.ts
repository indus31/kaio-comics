import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users/users.service';
import { StorageService } from '../core/services/storage.service';
import { UserType } from '../core/model/user.type';
import { ModalController } from '@ionic/angular';
import { UpdateProfilePictureComponent } from '../shared/components/update-profile-picture/update-profile-picture.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  user?: UserType;
  private _subscription!: Subscription
  constructor(private _userservice: UsersService, private _storageService: StorageService) { }

  ngOnInit() {
    const userId = this._storageService.retrieve('session');
    this._subscription = this._userservice.findOneBy(userId).subscribe({
      next:(user: UserType)=>{
        this.user = user
      },
      error:(error:any)=>{},
      complete:()=>{console.log('user informations loaded')}
    })
    
  }
  ngOnDestroy(): void {
    // Nettoyez les ressources si nécessaire
    console.log('Component destroyed');
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
