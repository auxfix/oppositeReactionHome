import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'or-file-form-control',
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
  private file: object;

  onChange: any = () => { };
  onTouched: any = () => { };

  addFile(e) {
    if(e.target && e.target.files && e.target.files[0]){
      this.file = e.target.files[0];
    } else {
      this.file = null;
    }
    this.onChange(this.file);
    this.onTouched();
  }

  // We implement this method to keep a reference to the onChange
  // callback function passed by the forms API
  registerOnChange(fn) {
    this.onChange = fn;
  }
  // We implement this method to keep a reference to the onTouched
  //callback function passed by the forms API
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  // This is a basic setter that the forms API is going to use
  writeValue(value) {
    this.addFile(value)
  }
}
