import {Component, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {TracksService} from 'api/tracks.service';

interface UploadDataType {
  data: FormData;
  endCallback();
}

@Component({
  selector: 'app-upload-track',
  templateUrl: './upload-track.component.html',
  styleUrls: ['./upload-track.component.scss']
})
export class UploadTrackComponent implements OnInit {
  private isActiveUpload: boolean;

  @ViewChild('trackUploadFormTag') trackUploadFormRef: NgForm;
  @Output() uploadStart = new EventEmitter<UploadDataType>();

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
  }

  uploadTrack() {
    this.trackUploadFormRef.ngSubmit.emit();
  }

  onFormSubmit() {
    const trackData = this.trackUploadForm.value;
    const input = new FormData();

    input.append('trackName', trackData.trackName);
    input.append('bandName', trackData.bandName);
    input.append('file', trackData.file);

    this.uploadStart.emit({data: input, endCallback: () => this.clearForm()});
  }

  clearForm() {
    this.trackUploadFormRef.resetForm();
    this.trackUploadForm.markAsUntouched();
  }
}
