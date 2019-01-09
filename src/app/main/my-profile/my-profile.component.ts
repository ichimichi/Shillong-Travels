import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  myprofile: Profile = {
      firstName: "Andrew",
      lastName: "Black",
      gender: "Male",
      dob: "04/11/1992",
      phoneNo: 9085578906,
      email: "andrew@gmail.com"
    };

}

export interface Profile{
  firstName:string,
  lastName: string,
  gender: string,
  dob: string,
  phoneNo: number,
  email : string
}