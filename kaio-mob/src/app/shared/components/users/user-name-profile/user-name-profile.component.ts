import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { map, Subscription, take } from 'rxjs';

import { FileUploadService } from 'src/app/core/file-upload.service';
import { UserType } from 'src/app/core/model/user.type';
import { StorageService } from 'src/app/core/services/storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-name-profile',
  templateUrl: './user-name-profile.component.html',
  styleUrls: ['./user-name-profile.component.scss'],
})
export class UserNameProfileComponent  implements OnInit, OnDestroy ,OnChanges{
  
  @Input() user?: UserType
  private _subscription!: Subscription
  @Input()
  public userName : string = this.storageService.retrieve('userNameSession');

  constructor(private storageService: StorageService,private _userService:UsersService) { }
 
  ngOnInit(): void {
    console.log('Component initialized');
    console.log('session of '+this.userName)
    const id = this.storageService.retrieve('session')
    this._subscription = this._userService.findOneBy(id).subscribe({
      next:(user: UserType)=>{
        this.user = user
      },
      error:(error:any)=>{console.log(error)},
      complete:()=>{console.log(this.user?.profilePicture)}
    })
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']) {
      console.log('user input property changed:', changes['user'].currentValue);
      console.log('restart component')
      this.ngOnInit();
    }
  }

  ngOnDestroy(): void {
    // Nettoyez les ressources si nécessaire
    console.log('Component destroyed');
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
  


