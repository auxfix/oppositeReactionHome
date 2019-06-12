import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { TracksService } from 'api/tracks.service';
import {PublicAudioPlayerComponent} from 'tracks/components/public-audio-player/public-audio-player.component';

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
  @Input() currentTrackId: any;
  @Input() isPlay: boolean;

  @ViewChild(PublicAudioPlayerComponent) player: PublicAudioPlayerComponent;

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
