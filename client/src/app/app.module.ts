import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavPanelComponent } from 'navigation/nav-panel/nav-panel.component';
import { HomeComponent } from 'home/home.component';
import { TracksComponent } from 'tracks/tracks.component';
import { AlbumComponent } from 'album/album.component';
import { AdminComponent } from 'admin/admin.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminPhotoComponent } from 'admin/photo/photo.component';
import { AdminTracksComponent } from 'admin/tracks/tracks.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    HomeComponent,
    TracksComponent,
    AlbumComponent,
    AdminComponent,
    FileSelectDirective,
    AdminTracksComponent,
    AdminPhotoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
