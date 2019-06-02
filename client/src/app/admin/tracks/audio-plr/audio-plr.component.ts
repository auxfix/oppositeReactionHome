import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Plyr from 'plyr';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-audio-plr',
  templateUrl: './audio-plr.component.html',
  styleUrls: ['./audio-plr.component.scss']
})
export class AudioPlrComponent implements OnInit {

  trackId: any = null;
  @Output() trackPlayEvent = new EventEmitter<{isPlay: boolean, trackId: any}>();

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  constructor() {
  }

  ngOnInit() {
  }

  pause(): void {
    this.plyr.player.pause();
  }

  play(id: any): void {
    this.trackId = id;
    this.plyr.player.source = {
      type: 'audio',
      sources: [
        {
          src: `http://localhost:3000/tracks/play/${this.trackId}`,
          type: 'audio/mp3',
        },
      ],
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
