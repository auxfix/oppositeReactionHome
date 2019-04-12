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
import { RoundButtonComponent } from 'common/components/round-button/round-button.component';
import { ValidationMessageComponent } from 'common/components/validation-message/validation-message.component';
import { FormInputComponent } from 'common/components/form/input/input.component';
import { FileFormComponent } from 'common/components/form/file-input/file-input.component';
import { TriangleSlideBtnComponent } from 'common/components/triangle-slide-btn/triangle-slide-btn.component';
import { UploadTrackComponent } from 'common/components/upload-track/upload-track.component';
import { TracksListComponent } from './admin/tracks/tracks-list/tracks-list.component';
import { EditTrackItemComponent } from './admin/tracks/tracks-list/edit-track-item/edit-track-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    NavPanelComponent,
    HomeComponent,
    TracksComponent,
    AlbumComponent,
    AdminComponent,
    FileSelectDirective,
    AdminTracksComponent,
    AdminPhotoComponent,
    ValidationMessageComponent,
    RoundButtonComponent,
    FormInputComponent,
    FileFormComponent,
    TriangleSlideBtnComponent,
    UploadTrackComponent,
    TracksListComponent,
    EditTrackItemComponent,
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
