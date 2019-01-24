import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  pass: Password;

  EmailForm: FormGroup;
  PhoneForm: FormGroup;
  PasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private userService: UserService,
    private sb: MatSnackBar) {

    this.EmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.PhoneForm = this.formBuilder.group({
      phoneNo: ['', [Validators.required, Validators.minLength(10),  Validators.maxLength(10)]]
    });

    // this.PasswordForm = this.formBuilder.group({
    //   opassword:['', [Validators.required, Validators.minLength(8)]],
    //   npassword: ['', [Validators.required, Validators.minLength(8)]],
    //   cpassword: ['', [Validators.required]]
    // }, { validator: PasswordValidator });
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

  SaveMail() {
    this.editMail = !this.editMail;

    this.userService.updateProfile({ email: this.EmailForm.get('email').value, phone: this.myprofile.phone })
      .subscribe(res => {
        if (res.update) {
          this.myprofile.email = this.EmailForm.get('email').value;
          this.sb.open('Email Successfully Updated','',{duration:1000});
        }
      })
  }

  EditPhone() {
    this.editPhone = !this.editPhone;
  }

  SavePhone() {
    this.editPhone = !this.editPhone;
    this.userService.updateProfile({ email: this.myprofile.email , phone: this.PhoneForm.get('phoneNo').value})
    .subscribe(res => {
      if (res.update) {
        this.myprofile.phone = this.PhoneForm.get('phoneNo').value;
        this.sb.open('phone Number Successfully Updated','',{duration:1000});
      }
    })
  }

  EditPassword() {
    this.editPassword = !this.editPassword;
  }

  SavePassword() {
    this.editPassword = !this.editPassword;
    // this.pass.oldPassword = this.PasswordForm.get('opassword').value;
    // this.pass.newPassword = this.PasswordForm.get('npassword').value;
    // this.userService.updatePassword(this.pass);
  }
 

}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
}

interface Password {
  oldPassword: string;
  newPassword: string;
}