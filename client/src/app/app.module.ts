import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavPanelComponent } from './navigation/nav-panel/nav-panel.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { AlbumComponent } from './album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    NavPanelComponent,
    HomeComponent,
    TracksComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
