import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { email } from 'ngx-custom-validators/src/app/email/validator';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

export interface subject {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;

  subjects: subject[] = [
    {value: 'Delete My Account-0', viewValue: 'Delete My Account'},
    {value: 'Cannot Access my account-1', viewValue: 'Cannot Access my account'},
    {value: 'Others-2', viewValue: 'Others'}
  ];


  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService, 
              private store: Store<AppState>, 
              private snackbar: MatSnackBar,
              private router: Router) {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])]
    });

  }


  onSubmit() {
    // this.submitted = true;

    // if(this.messageForm.invalid) {
    //   this.success = false;
    //   return;
    // }

    // this.success = true;

    this.contactService.contact(this.email.value, this.message.value, this.subject.value).subscribe(
        res => {
          // console.log('success', res);
          this.snackbar.open('Your message has been successfully sent ', '', { duration: 1000 });
          this.router.navigate(['/home']);
        },
        err => {
          this.snackbar.open('Unable to send image', '', { duration: 1000 });
          // console.log('error', err);
        }
      );
  }

  ngOnInit() {
  }

  get email(){
    return this.messageForm.get('email');
  }

  get subject(){
    return this.messageForm.get('subject');
  }

  get message(){
    return this.messageForm.get('message');
  }
}
