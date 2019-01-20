import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.scss']
})
export class AccountRegistrationComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    cpassword: ['']
  }, { validator: PasswordValidator });


  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  registerUser() {

    this.auth.registerUser(this.registrationForm.value)
      .subscribe(
        res => {
          console.log("success", res);
          localStorage.setItem('token', res.token);
          this.snackbar.open('Registration Successfull, ' + this.registrationForm.value.firstName,'',{duration:1000});
          this.router.navigate(['/home']);
        },
        error => { 
          this.snackbar.open('ERROR!','',{duration:1000});
          console.log("error", error); 
        }
      );
  }



  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get phone() {
    return this.registrationForm.get('phone');
  }

  get gender() {
    return this.registrationForm.get('gender');
  }

  get date() {
    return this.registrationForm.get('dateOfBirth');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get cpassword() {
    return this.registrationForm.get('cpassword');
  }

}

