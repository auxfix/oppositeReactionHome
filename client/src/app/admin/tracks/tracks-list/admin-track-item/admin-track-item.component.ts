import {Component, Input, OnInit} from '@angular/core';

interface Track {
  fileName: string;
  trackName: string;
  bandName: string;
}

@Component({
  selector: 'app-admin-track-item',
  templateUrl: './admin-track-item.component.html',
  styleUrls: ['./admin-track-item.component.scss']
})
export class AdminTrackItemComponent implements OnInit {
  private isEdit: boolean;
  private trackDataToShare: Track;
  @Input() trackData: Track;

  constructor() { }

  ngOnInit() {
    this.isEdit = false;
    this.trackDataToShare = this.trackData;
  }

  switchStates(isEdit: boolean) {
    this.isEdit = isEdit;
  }
}
