import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Track {
  fileName: string;
  trackName: string;
  bandName: string;
  order: Number;
  songId: any;
  isFrontPageTrack: Boolean;
  _id: any;
}

@Component({
  selector: 'app-play-track-item',
  templateUrl: './play-track-item.component.html',
  styleUrls: ['./play-track-item.component.scss']
})
export class PlayTrackItemComponent implements OnInit {
  @Input()  trackData: Track;
  @Output() changeState = new EventEmitter();
  @Output() changeOrder = new EventEmitter();
  @Input() public currentTrackId: any;
  @Input() public isPlay: boolean;
  @Output() trackPlayEvent: EventEmitter<{trackId: any, isPlay: boolean}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doChangeState() {
    this.changeState.emit();
  }

  orderUp() {
    this.changeOrder.emit({ way: 'up' , order: this.trackData.order});
  }

  orderDown() {
    this.changeOrder.emit({ way: 'down', order: this.trackData.order});
  }

  trackPlay (trackId: any, isPlay: boolean) {
    this.trackPlayEvent.emit({trackId: trackId, isPlay: isPlay});
  }
}
