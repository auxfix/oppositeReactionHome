import {Component, OnInit} from '@angular/core';
import { TracksService } from 'api/tracks.service';

interface UploadDataType {
  data: FormData;
  endCallback();
}

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class AdminTracksComponent implements OnInit {

  constructor(private http: TracksService) {}

  uploadTrack(uploadData: UploadDataType) {
    this.http.uploadTrack(uploadData.data).subscribe(res => {
      uploadData.endCallback();
    });
  }

  ngOnInit(): void {
  }
}
