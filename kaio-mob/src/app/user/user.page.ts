import { Component, OnInit } from '@angular/core';
import { UsersService } from '../core/services/users/users.service';
import { StorageService } from '../core/services/storage.service';
import { UserType } from '../core/model/user.type';
import { ModalController } from '@ionic/angular';
import { UpdateProfilePictureComponent } from '../shared/components/update-profile-picture/update-profile-picture.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user?: UserType;
  constructor(private _userservice: UsersService, private _storageService: StorageService) { }

  ngOnInit() {
    const userId = this._storageService.retrieve('session');
    this._userservice.findOneBy(userId[0]).subscribe((user) => {

      this.user = user;
    });
    console.log(userId[0])
    console.log("data : " + JSON.stringify(this.user))
  }
 
}
