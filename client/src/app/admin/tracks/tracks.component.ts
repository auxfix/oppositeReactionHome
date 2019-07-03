import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TracksService } from 'api/tracks.service';
import {AudioPlrComponent} from 'admin/tracks/audio-plr/audio-plr.component';

interface UploadDataType {
  data: FormData;
  endCallback();
}

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
  isFrontPageTrack: Boolean;
}

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class AdminTracksComponent implements OnInit {

  tracks: Track[] = [];
  @Input() currentTrackId: any;
  @Input() isPlay: boolean;

  @ViewChild(AudioPlrComponent) player: AudioPlrComponent;

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

  getAllTracks() {
    this.http.getAllTracks()
      .subscribe(songs => {
        console.log(songs);
        this.tracks = songs;
      }, error => console.log(error));
  }

  trackPlay(trackId: any, isPlay: boolean) {
    this.currentTrackId = trackId;
    this.isPlay = isPlay;
  }
  trackPlayFromLst(trackId: any, isPlay: boolean) {
    this.currentTrackId = trackId;
    this.isPlay = isPlay;
    if (isPlay) {
      this.player.play(trackId);
    } else {
      this.player.pause();
    }
  }
}
