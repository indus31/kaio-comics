import { Component, Input, OnInit } from '@angular/core';
import { UserType } from 'src/app/core/model/user.type';

@Component({
  selector: 'app-user-name-profile',
  templateUrl: './user-name-profile.component.html',
  styleUrls: ['./user-name-profile.component.scss'],
})
export class UserNameProfileComponent  implements OnInit {
  @Input() user?: UserType
  constructor() { }

  ngOnInit() {}

}
