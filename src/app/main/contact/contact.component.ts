import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      subject: [''],
      message: ['', Validators.compose([Validators.required])]
    });

  }


  onSubmit() {
    this.submitted = true;

    if(this.messageForm.invalid) {
      this.success = false;
      return;
    }

    this.success = true;
  }

  ngOnInit() {
  }

}
