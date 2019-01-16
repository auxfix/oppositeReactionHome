import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrackControlComponent } from './upload-track-control.component';

describe('UploadTrackControlComponent', () => {
  let component: UploadTrackControlComponent;
  let fixture: ComponentFixture<UploadTrackControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTrackControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTrackControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
