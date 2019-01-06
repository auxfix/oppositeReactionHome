import { Component, OnInit } from '@angular/core';
import { TracksService } from 'api/tracks.service';

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
}

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class TracksComponent implements OnInit {

  tracks: Track[] = [];

  constructor(private http: TracksService) {}

  ngOnInit() {
    this.getAllTracks();
  }

  // Get all users from the API
  getAllTracks() {
    this.http.getAllTracks()
      .subscribe(songs => {
        console.log(songs);
        this.tracks = songs;
      }, error => console.log(error));
  }
}
