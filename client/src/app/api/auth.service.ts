import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { map, filter, shareReplay, tap } from 'rxjs/operators';
import {User} from 'models/user';

export const ANONYMOUS_USER: User = {
  id: undefined,
  login: undefined
};


@Injectable()
export class AuthService {

  API = 'http://localhost:3000';

  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));

  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {
    http.get<User>(`${this.API}/user`)
      .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
  }

  login(login: string, password: string ) {
    return this.http.post<User>(`${this.API}/user/login`, {login, password}).pipe(shareReplay(),
      tap(user => this.subject.next(user)));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API}/user/logout`, null).pipe(shareReplay(),
      tap(user => this.subject.next(ANONYMOUS_USER)));
  }
}








