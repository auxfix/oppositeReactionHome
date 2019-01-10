import {Component, OnInit, HostBinding, ViewChild} from '@angular/core';
import { TracksService } from 'api/tracks.service';
import {
  AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn,
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
  providers: [TracksService],
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

  private isActiveUpload: boolean;
  public slideButtonAnimTrigger: string;

  @ViewChild('trackUploadFormTag') trackUploadFormRef: NgForm;


  // form data
  public trackUploadForm: FormGroup;

  constructor(private fb: FormBuilder, private http: TracksService) {

    this.trackUploadForm = fb.group({
      trackName: ['', [Validators.required, Validators.maxLength(50)]],
      bandName: ['', [Validators.required, Validators.maxLength(50)]],
      file: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.isActiveUpload = false;
    this.slideButtonAnimTrigger = 'down';
  }

  uploadTrack() {
    this.slideButtonAnimTrigger = 'up';
    this.trackUploadFormRef.ngSubmit.emit();
  }

  slideEnd() {
    this.slideButtonAnimTrigger = 'down';
  }

  addFile(e) {
    const file = e.target.files[0];
    this.trackUploadForm.controls.file.setValue(file);
  }

  onFormSubmit() {
    const trackData = this.trackUploadForm.value;
    const input = new FormData();

    input.append('trackName', trackData.trackName);
    input.append('bandName', trackData.bandName);
    input.append('file', trackData.file);

    this.http.uploadTrack(input).subscribe(res => {
      this.trackUploadForm.reset();
    });
  }

  clearForm() {
    this.trackUploadForm.reset();
  }
}
