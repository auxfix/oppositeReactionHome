import {Component, OnInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() changeState = new EventEmitter();

  @ViewChild('trackEditFormTag') trackEditFormRef: NgForm;

  // form data
  public trackEditForm: FormGroup;

  ngOnInit(): void {
    this.trackEditForm = this.fb.group({
      trackName: [this.trackData.trackName, [Validators.required, Validators.maxLength(50)]],
      bandName: [this.trackData.bandName, [Validators.required, Validators.maxLength(50)]],
    });
  }

  constructor(public fb: FormBuilder) {

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

  doChangeState() {
    this.changeState.emit();
  }
}
