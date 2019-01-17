import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleSlideBtnComponent } from './triangle-slide-btn.component';

describe('TriangleSlideBtnComponent', () => {
  let component: TriangleSlideBtnComponent;
  let fixture: ComponentFixture<TriangleSlideBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriangleSlideBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleSlideBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
