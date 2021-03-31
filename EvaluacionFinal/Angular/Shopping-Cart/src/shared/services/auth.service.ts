import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserResponse, User } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }
  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/authentication`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    console.log(user);
    if (user!=null) {
     //    this.user.next(user);
        if ( user.code === 0 ) {
          this.router.navigate(['/home']);
        }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
