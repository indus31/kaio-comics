/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { UserType } from 'src/app/core/model/user.type';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent  implements OnInit {
  @Input()
  public users!: UserType[]
  private _subscription!: Subscription
  constructor(private _userService: UsersService) { }

  ngOnInit():void{
    this._subscription = this._userService.findAll().subscribe({
      next:(users: Array<UserType>)=>{
        this.users = users
      },
      error:(error:any)=>{},
      //complete:()=>{}
    })
  }

}
