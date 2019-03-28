import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormInputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

describe('Component: Input', () => {
  let fixture: ComponentFixture<FormInputComponent>;
  let component: FormInputComponent;
  let el: HTMLInputElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInputComponent ],
      imports: [FormsModule],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormInputComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('input'));
      el = de.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('input binding works correctly', async () => {
    const testTextOne = 'test text 1';
    const testTextTwo = 'test text 2';

    component.value = testTextOne;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(el.value).toBe(testTextOne);

      el.value = testTextTwo;
      el.dispatchEvent(new Event('input'));

      expect(component.value).toBe(testTextTwo);
    });
  });
});
