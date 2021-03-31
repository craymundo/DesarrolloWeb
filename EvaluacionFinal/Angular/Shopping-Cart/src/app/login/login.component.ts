import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '../../shared/utils/base-form-user';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  errorLogin = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public loginForm: BaseFormUser
  ) {}

  ngOnInit(): void {
    console.log('ngOnInt');
    this.loginForm.baseForm.get('role').setValidators(null);
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loginForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          console.log('autentiicacion: ', res);
          if (res.code === 0) {
            this.router.navigate(['/home']);
          } else {
            this.errorLogin = res.message;
          }
        }
      },
      (error) => {
        console.log(error);
      })
    );
  }

  checkField(field: string): boolean {
    return this.loginForm.isValidField(field);
  }
}
