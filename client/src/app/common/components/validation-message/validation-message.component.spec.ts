import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationMessageComponent } from './validation-message.component';
import { FormControl } from '@angular/forms';

class MockFormControl extends FormControl {
  errors = {};
  public get invalid(): boolean {
    return true;
  }
  public get touched() {
    return true;
  }

  constructor(errors = {}) {
    super();
    this.errors = errors;
  }
}

describe('ValidationMessageComponent', () => {
  let component: ValidationMessageComponent;
  let fixture: ComponentFixture<ValidationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationMessageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMessageComponent);
    component = fixture.componentInstance;

    component.field = new MockFormControl();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show custom error', () => {
    const validationMsg = 'Custom validation message';

    component.field = new MockFormControl({
        custom: validationMsg,
    });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('li').innerText).toEqual(validationMsg);
  });

});
