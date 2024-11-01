import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserHeaderComponent } from "./components/users/user-header.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppMenuComponent } from "./components/app-menu/app-menu.component";
import { UserCoverComponent } from "./components/users/user-cover/user-cover.component";
import { UserNameProfileComponent } from "./components/users/user-name-profile/user-name-profile.component";
import { ChangePictureComponent } from "./components/users/change-picture/change-picture.component";
import { UpdateProfilePictureComponent } from "./components/update-profile-picture/update-profile-picture.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        UserHeaderComponent,AppHeaderComponent,AppMenuComponent,UserCoverComponent,UserNameProfileComponent,ChangePictureComponent,UpdateProfilePictureComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule
    ],
    exports: [
        UserHeaderComponent,AppHeaderComponent,AppMenuComponent,UserCoverComponent,UserNameProfileComponent,ChangePictureComponent,UpdateProfilePictureComponent
    ]
  })
  export class SharedModule { 
  
  }