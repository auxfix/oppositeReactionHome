import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'api/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(
      () => { this.error = ''; }
    );
  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;

    if (val.login && val.password) {

      this.authService.login(val.login, val.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/admin');
          },
          error => {
            this.error = error.message;
          }
        );
    }
  }
}
