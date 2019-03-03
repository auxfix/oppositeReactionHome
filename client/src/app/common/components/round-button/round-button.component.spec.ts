import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { RoundButtonComponent } from './round-button.component';
import {MatIconModule} from "@angular/material";

describe('RoundButtonComponent', () => {
  let fixture: ComponentFixture<RoundButtonComponent>;
  let component: RoundButtonComponent;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundButtonComponent ],
      imports: [
        MatIconModule,
      ],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(RoundButtonComponent);
      component = fixture.componentInstance;
      component.icon = 'clear';
      component.customStyles = {};
      spyOn(component.clickButton, 'emit');
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

    expect(component.clickButton.emit).toHaveBeenCalled();
  });
});
