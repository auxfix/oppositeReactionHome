import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-audio-plr',
  templateUrl: './audio-plr.component.html',
  styleUrls: ['./audio-plr.component.scss']
})
export class AudioPlrComponent implements OnInit {

  @Input() trackId: any;
  @Output() TrackPlayEvent = new EventEmitter<{isPlay: boolean}>();

  constructor() { }

  ngOnInit() {
  }
}
