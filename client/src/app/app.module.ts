import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { PlyrModule } from 'ngx-plyr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NavPanelComponent } from 'navigation/nav-panel/nav-panel.component';
import { HomeComponent } from 'home/home.component';
import { TracksComponent } from 'tracks/tracks.component';
import { AlbumComponent } from 'album/album.component';
import { PublicNewsComponent } from 'news/news.component';
import { NewsAdminComponent } from 'admin/news/news.component';
import { AdminComponent } from 'admin/admin.component';
import { AdminPhotoComponent } from 'admin/photo/photo.component';
import { AdminTracksComponent } from 'admin/tracks/tracks.component';
import { RoundButtonComponent } from 'common/components/round-button/round-button.component';
import { ValidationMessageComponent } from 'common/components/validation-message/validation-message.component';
import { FormInputComponent } from 'common/components/form/input/input.component';
import { FileFormComponent } from 'common/components/form/file-input/file-input.component';
import { TriangleSlideBtnComponent } from 'common/components/triangle-slide-btn/triangle-slide-btn.component';
import { UploadTrackComponent } from 'common/components/upload-track/upload-track.component';
import { TracksListComponent } from 'admin/tracks/tracks-list/tracks-list.component';
import { EditTrackItemComponent } from 'admin/tracks/tracks-list/admin-track-item/edit-track-item/edit-track-item.component';
import { PlayTrackItemComponent } from 'admin/tracks/tracks-list/admin-track-item/play-track-item/play-track-item.component';
import { AdminTrackItemComponent } from 'admin/tracks/tracks-list/admin-track-item/admin-track-item.component';
import { ControlButtonComponent } from 'common/components/control-button/control-button.component';
import { AudioPlrComponent } from 'admin/tracks/audio-plr/audio-plr.component';
import { PublicTrackItemComponent } from 'tracks/components/public-track-item/public-track-item.component';
import { PublicAudioPlayerComponent } from 'tracks/components/public-audio-player/public-audio-player.component';
import { ListOfNewsComponent } from 'admin/news/components/list-of-news/list-of-news.component';
import { EditNewsComponent } from 'admin/news/components/edit-news/edit-news.component';
import { NewsAdminItemComponent } from 'admin/news/components/list-of-news/news-admin-item/news-admin-item.component';
import { RichTextEditorComponent } from 'common/components/form/rich-text-editor/rich-text-editor.component';
import { PublicNewsItemComponent } from 'news/components/news-item/news-item.component';
import { SafeHtmlPipe } from 'pipes/safeHtml.pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BigPlayButtonComponent } from 'home/components/big-play-button/big-play-button.component';
import { LoginFormComponent } from 'login/login-form/login-form.component';
import { AuthorizationGuard } from 'api/authorization.guard';
import {WithCreadantialsInterceptor} from 'interceptors/withCreadantials.interceptor';


import 'hammerjs';
import {Router} from '@angular/router';
import {AuthService} from 'api/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    PublicNewsComponent,
    NewsAdminComponent,
    NavPanelComponent,
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
    PlayTrackItemComponent,
    AdminTrackItemComponent,
    ControlButtonComponent,
    AudioPlrComponent,
    PublicTrackItemComponent,
    PublicAudioPlayerComponent,
    ListOfNewsComponent,
    EditNewsComponent,
    NewsAdminItemComponent,
    RichTextEditorComponent,
    PublicNewsItemComponent,
    SafeHtmlPipe,
    BigPlayButtonComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    PlyrModule,
    CKEditorModule,
    NgScrollbarModule,
    MatSliderModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'adminsOnlyGuard',
      useFactory: (authService: AuthService,
                   router: Router) =>
        new AuthorizationGuard(authService, router),
      deps: [
        AuthService,
        Router
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCreadantialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
