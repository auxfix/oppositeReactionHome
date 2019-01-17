import {Component, OnInit, ViewChild} from '@angular/core';
import { TracksService } from 'api/tracks.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
  providers: [TracksService]
})
export class AdminTracksComponent implements OnInit {

  private isActiveUpload: boolean;

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

    this.http.uploadTrack(input).subscribe(res => {
      this.clearForm();
    });
  }

  clearForm() {
    this.trackUploadFormRef.resetForm();
    this.trackUploadForm.markAsUntouched();
  }
}
