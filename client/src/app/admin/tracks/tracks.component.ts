import { Component, OnInit, HostBinding } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  animations: [
    trigger('slideButtonAnim', [
      state('down', style({
        width: '2.4rem',
        height: '2.4rem',
        top: '0.6rem',
        left: '0.29rem',
        paddingTop: '0.7rem',
        fontSize: '1.6rem',
      })),
      state('up', style({
        width: '3rem',
        height: '3rem',
        top: 0,
        left: 0,
        paddingTop: '1.7rem',
        fontSize: '2rem',
      })),
      transition('down => up', [
        animate('0.2s')
      ]),
      transition('up => down', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class AdminTracksComponent implements OnInit {

  constructor() { }

  private url = 'http://localhost:3000/tracks';
  private uploader: FileUploader;
  private trackName: String;
  private isActiveUpload: boolean;
  private slideButtonAnimTrigger: string;

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url, queueLimit: 1});
    this.isActiveUpload = false;
    this.slideButtonAnimTrigger = 'down';

    this.uploader.onBuildItemForm = (fileItem, form) => {
      form.append('trackName', this.trackName);
      return {fileItem, form};
    };
  }

  uploadTrack() {
    this.slideButtonAnimTrigger = 'up';
    this.uploader.uploadAll();
  }

  slideEnd() {
    this.slideButtonAnimTrigger = 'down';
  }
}
