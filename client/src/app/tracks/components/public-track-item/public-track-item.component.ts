import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';

interface Track {
  fileName: string;
  trackName: string;
  bandName: string;
  order: Number;
  songId: any;
  _id: any;
}

@Component({
  selector: 'app-public-track-item',
  templateUrl: './public-track-item.component.html',
  styleUrls: ['./public-track-item.component.scss']
})
export class PublicTrackItemComponent implements OnInit {
  @Input() public trackData: Track;
  @Input() public currentTrackId: any;
  @Input() public isPlay: boolean;
  @Output() playTrack: EventEmitter<{trackId: any, isPlay: boolean}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  trackPlay (trackId: any, isPlay: boolean) {
    this.playTrack.emit({trackId: trackId, isPlay: isPlay});
  }
}
