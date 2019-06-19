import {Component, forwardRef} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ],
})
export class RichTextEditorComponent implements ControlValueAccessor {
  public Editor = ClassicEditor;
  onChange;
  onTouched;
  modelValue = null;

  onTextChange(e) {
    this.modelValue = e;
    this.onChange(e);
    this.onTouched();
  }

  writeValue(value) {
    this.modelValue = value;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}

