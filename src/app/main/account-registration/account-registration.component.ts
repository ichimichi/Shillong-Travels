import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.scss']
})
export class AccountRegistrationComponent implements OnInit {

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get gender(){
    return this.registrationForm.get('gender');
  }

  get date(){
    return this.registrationForm.get('date');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  constructor(private fb: FormBuilder) { }

  registrationForm = this.fb.group({
    firstName: ['',[Validators.required,Validators.minLength(2)]],
    lastName: ['',[Validators.required]],
    gender: ['',[Validators.required]],
    date: ['',[Validators.required]],
    phone: ['',[Validators.required,Validators.minLength(10)]],
    email: ['',[Validators.required]],
  });

  onSubmit(){
    console.log(this.registrationForm.value);
  }
  ngOnInit() {
  }

}
