import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  myprofile: Profile;
  editMail = false;
  editPhone = false;
  editPassword = false;
  email: string;

  myProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private userService: UserService) {
    this.myProfileForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email])],
      phoneNo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {

   this.userService.getProfile().subscribe(
      res => { this.myprofile = res },
      err => { console.log(err) }
    );
  }

  EditMail() {
    this.editMail = !this.editMail;
  }

  EditPhone() {
    this.editPhone = !this.editPhone;
  }


}

interface Profile{
  firstName: string;
  lastName: string;
  email:string;
  dateOfBirth: string;
  phone: string;
}