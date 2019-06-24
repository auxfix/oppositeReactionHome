import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'home/home.component';
import { TracksComponent } from 'tracks/tracks.component';
import { PublicNewsComponent } from 'news/news.component';
import { AdminComponent } from 'admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: PublicNewsComponent},
  { path: 'tracks', component: TracksComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
