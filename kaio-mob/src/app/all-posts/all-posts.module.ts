import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPostsPageRoutingModule } from './all-posts-routing.module';

import { AllPostsPage } from './all-posts.page';
import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './components/post/post.component';
import { InteractionBarComponent } from './components/interaction-bar/interaction-bar.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AllPostsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AllPostsPage,PostComponent,InteractionBarComponent,PostContentComponent,PostListComponent,AddPostComponent]
})
export class AllPostsPageModule {}
