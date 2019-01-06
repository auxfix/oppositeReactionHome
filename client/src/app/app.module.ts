import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { NavPanelComponent } from 'navigation/nav-panel/nav-panel.component';
import { HomeComponent } from 'home/home.component';
import { TracksComponent } from 'tracks/tracks.component';
import { AlbumComponent } from 'album/album.component';
import { AdminComponent } from 'admin/admin.component';
import { AdminPhotoComponent } from 'admin/photo/photo.component';
import { AdminTracksComponent } from 'admin/tracks/tracks.component';

// directives
import { ValidatorMessageComponent } from 'common/directives/validator-message.directive';



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
    ValidatorMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
