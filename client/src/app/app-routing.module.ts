import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'home/home.component';
import { TracksComponent } from 'tracks/tracks.component';
import { PublicNewsComponent } from 'news/news.component';
import { AdminComponent } from 'admin/admin.component';
import { LoginFormComponent } from 'login/login-form/login-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/or',
    pathMatch: 'full'
  },
  { path: 'or', component: HomeComponent },
  { path: 'news', component: PublicNewsComponent},
  { path: 'tracks', component: TracksComponent },
  { path: 'admin', component: AdminComponent, canActivate: ['adminsOnlyGuard'] },
  { path: 'login', component: LoginFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
