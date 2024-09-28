import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { UserHeaderComponent } from "./components/users/user-header.component";

@NgModule({
    declarations: [
        UserHeaderComponent
    ],
    imports: [
      CommonModule,
      IonicModule,
    ],
    exports: [
        UserHeaderComponent
    ]
  })
  export class SharedModule { 
  
  }