import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FileFormComponent } from './file-input.component';
import { MatIconModule } from '@angular/material';

describe('Component: file-input', () => {
  let fixture: ComponentFixture<FileFormComponent>;
  let component: FileFormComponent;
  let el: HTMLElement;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFormComponent ],
      imports: [MatIconModule],
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(FileFormComponent);
      component = fixture.componentInstance;
      spyOn(component, 'addFile');
      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('input'));
      el = de.nativeElement;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle onChange properly', () => {
    el.dispatchEvent(new Event('change'));

    expect(component.addFile).toHaveBeenCalled();
  });
});
