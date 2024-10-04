import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserHeaderComponent } from "./components/users/user-header.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppMenuComponent } from "./components/app-menu/app-menu.component";

@NgModule({
    declarations: [
        UserHeaderComponent,AppHeaderComponent,AppMenuComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
    ],
    exports: [
        UserHeaderComponent,AppHeaderComponent,AppMenuComponent
    ]
  })
  export class SharedModule { 
  
  }