import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.scss']
})
export class AccountRegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  registrationForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    date: [''],
    phone: [''],
    email: [''],
    user_type: [''],
  });
  ngOnInit() {
  }

}
