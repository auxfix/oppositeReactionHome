import { Component, OnInit } from '@angular/core';
import {AuthService} from 'api/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.scss']
})
export class NavPanelComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

  }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/login'));
  }
}
