import {Component, OnInit} from '@angular/core';
import { TracksService } from 'api/tracks.service';

interface UploadDataType {
  data: FormData;
  endCallback();
}

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
}

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class AdminTracksComponent implements OnInit {

  tracks: Track[] = [];

  constructor(private http: TracksService) {}

  uploadTrack(uploadData: UploadDataType) {
    this.http.uploadTrack(uploadData.data).subscribe(res => {
      uploadData.endCallback();
      this.getAllTracks();
    });
  }

  ngOnInit(): void {
    this.getAllTracks();
  }

  getAllTracksCallback() {
    this.getAllTracks();
  }

  getAllTracks() {
    this.http.getAllTracks()
      .subscribe(songs => {
        console.log(songs);
        this.tracks = songs;
      }, error => console.log(error));
  }
}
