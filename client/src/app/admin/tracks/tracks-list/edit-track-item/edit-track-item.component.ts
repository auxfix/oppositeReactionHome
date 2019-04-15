import {Component, Input, OnInit} from '@angular/core';

interface Track {
  fileName: string;
  trackName: string;
  bandName: string;
}

@Component({
  selector: 'app-edit-track-item',
  templateUrl: './edit-track-item.component.html',
  styleUrls: ['./edit-track-item.component.scss']
})
export class EditTrackItemComponent implements OnInit {
  @Input()  trackData: Track;

  constructor() { }

  ngOnInit() {
  }

}
