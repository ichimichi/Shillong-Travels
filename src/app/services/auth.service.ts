import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = 'http://localhost:8080/auth/register';
  loginUrl = 'http://localhost:8080/auth/login';

  constructor(
    private _http: HttpClient,
    private router: Router,
    public snackbar: MatSnackBar) { }

  registerUser(newUser: User) {
    return this._http.post<any>(this.registerUrl, newUser);
  }

  loginUser(user: User) {
    return this._http.post<any>(this.loginUrl, user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.snackbar.open('Signed Out Successfully','',{duration:1500});
    this.router.navigate(['/home']);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}                      
