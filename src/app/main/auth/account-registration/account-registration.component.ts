import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material';

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

  constructor(private fb: FormBuilder, private auth:AuthService) { }

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

  registerUser() {
    //console.log({date:this.registrationForm.value.dateOfBirth.toString()});
    // this.registrationForm.patchValue({
    //   dateOfBirth: this.registrationForm.value.dateOfBirth.toString()
    // });
    // let temp = this.registrationForm.value;
    // temp.dateOfBirth = this.registrationForm.value.dateOfBirth.toString();
    // console.log(temp);

    this.auth.postUser(this.registrationForm.value).subscribe(
      res => {console.log(res);alert('User Registered')},
      error => {console.log(error);}
    )
  }

  ngOnInit() {
  }

}

