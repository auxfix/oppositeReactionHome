import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TracksService } from 'api/tracks.service';

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
  @Output() orderChanged = new EventEmitter();

  constructor(private http: TracksService) { }

  ngOnInit() {
    this.isEdit = false;
    this.trackDataToShare = this.trackData;
  }

  switchStates(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  async changeOrder(way: string, order: Number) {
    await this.http.changeOrder(way, order).toPromise();
    this.orderChanged.emit();
  }
}
