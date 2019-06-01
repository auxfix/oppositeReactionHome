import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Track {
  fileName: String;
  originalName: String;
  contentType: String;
}

@Component({
  selector: 'app-tracks-list',
  templateUrl: './tracks-list.component.html',
  styleUrls: ['./tracks-list.component.scss']
})
export class TracksListComponent implements OnInit {

  @Input() tracks: Track[] = [];
  @Output() getAllTracksOut: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }

  getAllTracks() {
    this.getAllTracksOut.emit();
  }

}
