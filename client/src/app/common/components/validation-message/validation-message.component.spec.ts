import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMessageComponent } from './validation-message.component';
import { FormControl } from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

class MockFormControl extends FormControl {
  errors = {};

  invalidProp: boolean;
  touchedProp: boolean;

  public get invalid(): boolean {
    return this.invalidProp;
  }
  public get touched(): boolean {
    return this.touchedProp;
  }

  public set invalid(flag: boolean) {
    this.invalidProp = flag;
  }

  public set touched(flag: boolean) {
    this.touchedProp = flag;
  }

  constructor(errors = {}, touched = true, invalid = true) {
    super();
    this.errors = errors;
    this.touched = touched;
    this.invalid = invalid;
  }
}

describe('ValidationMessageComponent', () => {
  let fixture: ComponentFixture<ValidationMessageComponent>;
  let component: ValidationMessageComponent;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationMessageComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ValidationMessageComponent);
      component = fixture.componentInstance;
      const FormControlMock = new MockFormControl({required: true});
      component.field = FormControlMock;
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('div'));
      el = de.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show custom error', () => {
    const validationMsg = 'Custom validation message';
    const FormControlMock = new MockFormControl({
      custom: validationMsg,
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show required error', () => {
    const validationMsg = 'Field is required';
    const FormControlMock = new MockFormControl({
      required: true,
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show required true error', () => {
    const validationMsg = 'Value should be positive';
    const FormControlMock = new MockFormControl({
      requiredTrue: true,
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show email error', () => {
    const validationMsg = 'Field should contain e-mail';
    const FormControlMock = new MockFormControl({
      email: true,
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show pattern error', () => {
    const validationMsg = 'Field does not match to pattern';
    const FormControlMock = new MockFormControl({
      pattern: true,
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show minlength error', () => {
    const fieldMinLength =  10;
    const validationMsg = `Minimum length ${fieldMinLength}`;
    const FormControlMock = new MockFormControl({
      minlength: {
        requiredLength: 10,
      },
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
  it('show maxlength error', () => {
    const fieldMaxLength =  10;
    const validationMsg = `Maximum length ${fieldMaxLength}`;
    const FormControlMock = new MockFormControl({
      maxlength: {
        requiredLength: 10,
      },
    });
    component.field = FormControlMock;
    fixture.detectChanges();
    expect(el.querySelector('li').innerText.trim()).toEqual(validationMsg);
  });
});
