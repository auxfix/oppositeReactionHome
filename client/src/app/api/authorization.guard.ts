import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import { map, first, tap } from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationGuard implements  CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {

    return this.authService.user$
      .pipe(map(user => !!user.id), first(), tap(allowed => {
          if (!allowed) {
            this.router.navigateByUrl('/login');
          }
        }
      ));
  }
}
