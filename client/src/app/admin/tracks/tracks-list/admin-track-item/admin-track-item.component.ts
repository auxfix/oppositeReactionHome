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
  @Output() trackDataChanged = new EventEmitter();

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
    this.trackDataChanged.emit();
  }

  async updateTrackData(id: any, trackData: Object) {
    await this.http.updateTrackData(id, trackData).toPromise();
    this.isEdit = false;
    this.trackDataChanged.emit();
  }

  async deleteTrack(id: any) {
    await this.http.deleteTrack(id).toPromise();
    this.trackDataChanged.emit();
  }
}
