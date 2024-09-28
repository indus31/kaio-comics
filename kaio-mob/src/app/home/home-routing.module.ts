import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'posts',
        loadChildren: () => import('../all-posts/all-posts.module').then(m => m.AllPostsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
      },
      {
        path: '',
        redirectTo: '/home/posts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
