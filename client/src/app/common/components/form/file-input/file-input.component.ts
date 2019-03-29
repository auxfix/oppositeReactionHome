import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-file-form-control',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileFormComponent),
      multi: true
    }
  ],
})
export class FileFormComponent implements ControlValueAccessor {
  onChange;
  onTouched;
  value = null;

  addFile(e) {
    if (e.target && e.target.files && e.target.files[0]) {
      this.value = e.target.files[0];
      this.onChange(e.target.files[0]);
      this.onTouched();
    }
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
