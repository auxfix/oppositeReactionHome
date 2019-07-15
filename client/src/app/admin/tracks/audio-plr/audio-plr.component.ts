import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-audio-plr',
  templateUrl: './audio-plr.component.html',
  styleUrls: ['./audio-plr.component.scss']
})
export class AudioPlrComponent implements OnInit {
  @Input() initTrackId;
  trackId: any = null;
  @Output() trackPlayEvent = new EventEmitter<{isPlay: boolean, trackId: any}>();

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  audioSources;

  constructor() {
  }

  ngOnInit() {
    this.audioSources = [
      {
        src: `${environment.api}/tracks/play/${this.initTrackId}`,
        type: 'audio/mp3',
      },
    ];
  }

  pause(): void {
    this.plyr.player.pause();
  }

  play(id: any) {
    this.trackId = id;
    this.plyr.player.source = {
      type: 'audio',
      sources: [
        {
          src: `${environment.api}/tracks/play/${this.trackId}`,
          type: 'audio/mp3',
        }
      ]
    };

    this.plyr.player.play();
  }

  playStart() {
    this.trackPlayEvent.emit({isPlay: true, trackId: this.trackId});
  }

  playPause() {
    this.trackPlayEvent.emit({isPlay: false, trackId: this.trackId});
  }
}
