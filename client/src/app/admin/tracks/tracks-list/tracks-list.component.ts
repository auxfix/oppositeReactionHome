import { Component, OnInit } from '@angular/core';
import { TracksService } from 'api/tracks.service';

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
}

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

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
