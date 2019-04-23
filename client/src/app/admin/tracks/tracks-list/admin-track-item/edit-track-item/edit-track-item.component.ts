import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

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
  @Input() trackData: Track;

  @ViewChild('trackEditFormTag') trackEditFormRef: NgForm;

  // form data
  public trackEditForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder) {
    const trackPointer = this.trackData;
    this.trackEditForm = fb.group({
      trackName: [trackPointer.trackName, [Validators.required, Validators.maxLength(50)]],
      bandName: [trackPointer.bandName, [Validators.required, Validators.maxLength(50)]],
    });
  }

  saveTrack() {
    this.trackEditFormRef.ngSubmit.emit();
  }

  onFormSubmit() {
    const trackData = this.trackEditForm.value;
    const input = new FormData();

    input.append('trackName', trackData.trackName);
    input.append('bandName', trackData.bandName);
  }
}
