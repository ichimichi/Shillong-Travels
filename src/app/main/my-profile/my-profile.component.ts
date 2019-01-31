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
  mismatch= false;
  loaded = false;  

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

    this.PasswordForm = this.formBuilder.group({
      opassword:['', [Validators.required, Validators.minLength(8)]],
      npassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {

    this.userService.getProfile().subscribe(
      res => { 
        this.myprofile = res;
        this.loaded = true; },
      err => { console.log(err) }
    );
    
  }

  EditMail() {
    this.editMail = !this.editMail;
    this.email.markAsUntouched(); 
    this.email.markAsPristine();
  }

  SaveMail() {
    this.editMail = !this.editMail;

    this.userService.updateProfile({ email: this.EmailForm.get('email').value, phone: this.myprofile.phone })
      .subscribe(res => {
        if (res.update) {
          this.myprofile.email = this.EmailForm.get('email').value;
          this.sb.open('Email Successfully Updated','',{duration:1000});
        } else {
          this.sb.open('ERROR! Email cannot be Updated','',{duration:1000});
        }
      })
      this.email.markAsUntouched(); 
      this.email.markAsPristine();
  }

  EditPhone() {
    this.editPhone = !this.editPhone;
    this.phoneNo.markAsUntouched(); 
    this.phoneNo.markAsPristine();
  }

  SavePhone() {
    this.editPhone = !this.editPhone;
    this.userService.updateProfile({ email: this.myprofile.email , phone: this.PhoneForm.get('phoneNo').value})
    .subscribe(res => {
      if (res.update) {
        this.myprofile.phone = this.PhoneForm.get('phoneNo').value;
        this.sb.open('Phone Number Successfully Updated','',{duration:1000});
      } else {
        this.sb.open('ERROR! Phone Number cannot be Updated','',{duration:1000});
      }
    })

    this.phoneNo.markAsUntouched(); 
    this.phoneNo.markAsPristine();
  }

  EditPassword() {
    this.editPassword = !this.editPassword;
    this.opassword.markAsUntouched();
    this.opassword.markAsPristine();
    this.npassword.markAsUntouched();
    this.npassword.markAsPristine();
  }

  SavePassword() {
    this.editPassword = !this.editPassword;
     this.userService.updatePassword({opassword: this.PasswordForm.get('opassword').value, npassword: this.PasswordForm.get('npassword').value })
     .subscribe( 
       res => {
       if (res.match) {
        this.sb.open('Password Successfully Updated','',{duration:1000});
       } else if (!res.match){
        this.sb.open('Password change Unsuccessful! \n Enter correct password','',{duration:2000});
       }
     }, 
     err => {
        this.sb.open('ERROR! Password cannot be Updated','',{duration:1000});
     });
     this.opassword.markAsUntouched(); 
     this.opassword.markAsPristine();
     this.npassword.markAsUntouched(); 
     this.npassword.markAsPristine();
  }

  get email() {
    return this.EmailForm.get('email');
  }

  get phoneNo() {
    return this.PhoneForm.get('phoneNo');
  }

  get opassword() {
    return this.PasswordForm.get('opassword');
  }

  get npassword() {
    return this.PasswordForm.get('npassword');
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