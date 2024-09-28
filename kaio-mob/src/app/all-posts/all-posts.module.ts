import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPostsPageRoutingModule } from './all-posts-routing.module';

import { AllPostsPage } from './all-posts.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllPostsPageRoutingModule
  ],
  declarations: [AllPostsPage]
})
export class AllPostsPageModule {}
