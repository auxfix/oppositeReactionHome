import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TriangleSlideBtnComponent } from './triangle-slide-btn.component';
import { MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Triangle slide button', () => {
  let fixture: ComponentFixture<TriangleSlideBtnComponent>;
  let component: TriangleSlideBtnComponent;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriangleSlideBtnComponent ],
      imports: [
        MatIconModule,
        NoopAnimationsModule,
      ],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(TriangleSlideBtnComponent);
      component = fixture.componentInstance;
      spyOn(component.clickBtn, 'emit');
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('button'));
      el = de.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle onClick properly', () => {
    el.dispatchEvent(new Event('click'));

    expect(component.clickBtn.emit).toHaveBeenCalled();
  });
});
