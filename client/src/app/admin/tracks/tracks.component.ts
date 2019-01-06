import { Component, OnInit, HostBinding } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {
  AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn,
  Validators
} from '@angular/forms';

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

  private url = 'http://localhost:3000/tracks';
  private uploader: FileUploader;
  private trackName: String;
  private bandName: String;
  private isActiveUpload: boolean;
  private slideButtonAnimTrigger: string;


  // form data
  private trackUploadForm: FormGroup = null;

  constructor(private fb: FormBuilder) {

    this.trackUploadForm = fb.group({
      trackName: ['', [Validators.required, Validators.maxLength(50)]],
      bandName: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url, queueLimit: 1});
    this.isActiveUpload = false;
    this.slideButtonAnimTrigger = 'down';

    this.uploader.onBuildItemForm = (fileItem, form) => {
      form.append('trackName', this.trackName);
      form.append('bandName', this.bandName);
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
