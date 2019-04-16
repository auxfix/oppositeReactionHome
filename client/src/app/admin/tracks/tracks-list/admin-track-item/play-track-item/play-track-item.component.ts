import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Track {
  fileName: string;
  trackName: string;
  bandName: string;
}

@Component({
  selector: 'app-play-track-item',
  templateUrl: './play-track-item.component.html',
  styleUrls: ['./play-track-item.component.scss']
})
export class PlayTrackItemComponent implements OnInit {
  @Input()  trackData: Track;
  @Output() changeState = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  doChangeState() {
    this.changeState.emit();
  }
}
