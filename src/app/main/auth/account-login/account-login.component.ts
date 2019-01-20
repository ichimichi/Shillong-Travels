import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
  constructor(private fb: FormBuilder, 
              private auth: AuthService, 
              private router: Router,
              public snakcbar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.loginUser(this.loginForm.value).subscribe(
      res => {
        console.log("success", res);
        localStorage.setItem('token', res.token);
        this.snakcbar.open('Welcome Back, '+res.name,'',{duration:1500});
        this.router.navigate(['/home']);
      },
      error => { 
        console.log("error", error); 
        this.snakcbar.open('Invalid E-mail or Password','',{duration:1500});
      }
    )
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
