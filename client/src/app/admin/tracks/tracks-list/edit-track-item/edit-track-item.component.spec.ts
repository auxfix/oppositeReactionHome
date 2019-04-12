import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrackItemComponent } from './edit-track-item.component';

describe('EditTrackItemComponent', () => {
  let component: EditTrackItemComponent;
  let fixture: ComponentFixture<EditTrackItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrackItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
