import { Component, OnInit } from '@angular/core';
import { TracksService } from '../api/tracks.service';

interface Song {
  name: String;
  time: Number;
}

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class TracksComponent implements OnInit {

  songs: Song[] = [];

  constructor(private http: TracksService) {}

  ngOnInit() {
    this.getAllSongs();
  }

  // Get all users from the API
  getAllSongs() {
    this.http.getAllTracks()
      .subscribe(songs => {
        console.log(songs);
        this.songs = songs;
      }, error => console.log(error));
  }
}
