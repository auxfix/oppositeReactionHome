import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';

@Component({
  selector: 'app-public-audio-player',
  templateUrl: './public-audio-player.component.html',
  styleUrls: ['./public-audio-player.component.scss']
})
export class PublicAudioPlayerComponent implements OnInit {
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
        src: `http://localhost:3000/tracks/play/${this.initTrackId}`,
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
          src: `http://localhost:3000/tracks/play/${this.trackId}`,
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
