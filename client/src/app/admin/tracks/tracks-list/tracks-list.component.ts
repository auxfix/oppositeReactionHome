import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
  isFrontPageTrack: Boolean;
}

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  @Input() tracks: Track[] = [];
  @Input() public currentTrackId: any;
  @Input() public isPlay: boolean;
  @Output() trackPlayFromList: EventEmitter<{trackId: any, isPlay: boolean}> = new EventEmitter();
  @Output() getAllTracksOut: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }

  getAllTracks() {
    this.getAllTracksOut.emit();
  }

  trackPlay(trackId: any, isPlay: boolean) {
    this.trackPlayFromList.emit({trackId, isPlay});
  }
}
