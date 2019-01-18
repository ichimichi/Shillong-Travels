import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  editMail= false;
  editPhone= false;
  editPassword= false;

  myProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.myProfileForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      phoneNo: [''],
      password: ['']
    });
  }
  
  ngOnInit() {
  }

  myprofile= {
      name:{"firstName": "Andrew", "lastName": "Black"},
      gender: "Male",
      dob: "04/11/1992",
      phoneNo: 9085578906,
      email: "andrew@gmail.com",
      password: "password"
    };

}


/*
export interface Profile{
  firstName:string,
  lastName: string,
  gender: string,
  dob: string,
  phoneNo: number,
  email : string
}
*/