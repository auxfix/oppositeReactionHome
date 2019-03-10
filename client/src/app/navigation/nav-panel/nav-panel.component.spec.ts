import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, Routes} from '@angular/router';
import { Location } from '@angular/common';
import { NavPanelComponent } from 'src/app/navigation/nav-panel/nav-panel.component';
import {Component, DebugElement, OnInit} from '@angular/core';
import { By } from '@angular/platform-browser';

// @ts-ignore
@Component({
  selector: 'app-empty-component',
  template: '<span>empty</span>'
})
export class EmptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: EmptyComponent },
  { path: 'tracks', component: EmptyComponent },
  { path: 'album', component: EmptyComponent},
  { path: 'admin', component: EmptyComponent }
];

describe('navigation', () => {
  let fixture: ComponentFixture<NavPanelComponent>;
  let component: NavPanelComponent;
  let location: Location;
  let router: Router;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        EmptyComponent,
        NavPanelComponent
      ]
  })
      .compileComponents().then(() => {

      router = TestBed.get(Router);
      location = TestBed.get(Location);

      fixture = TestBed.createComponent(NavPanelComponent);
      debugElement = fixture.debugElement;
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('default rout to home path', fakeAsync(() => {
    debugElement
      .query(By.css('a.home'))
      .nativeElement.click();

    tick();

    expect(location.path()).toBe('/home');
  }));

  it('home click rout to home path', fakeAsync(() => {
    debugElement
      .query(By.css('a.home'))
      .nativeElement.click();

      tick();

      expect(location.path()).toBe('/home');
  }));

  it('tracks click rout to tracks path', fakeAsync(() => {
    debugElement
      .query(By.css('a.tracks'))
      .nativeElement.click();

    tick();

    expect(location.path()).toBe('/tracks');
  }));

  it('album click rout to album path', fakeAsync(() => {
    debugElement
      .query(By.css('a.album'))
      .nativeElement.click();

    tick();

    expect(location.path()).toBe('/album');
  }));

  it('admin click rout to admin path', fakeAsync(() => {
    debugElement
      .query(By.css('a.admin'))
      .nativeElement.click();

    tick();

    expect(location.path()).toBe('/admin');
  }));

});
