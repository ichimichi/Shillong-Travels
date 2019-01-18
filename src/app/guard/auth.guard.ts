import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              public snackBar: MatSnackBar, 
              private router: Router) { }

  canActivate(): boolean {
    if( this.authService.isLoggedIn()){
      return true;
    }else{
      this.snackBar.open('You must login to access this page','',{duration:1000});
      this.router.navigate(['/login'])
      return false;
    }
  }
}
