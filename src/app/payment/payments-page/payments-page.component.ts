import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms'
import { CustomValidators } from 'ngx-custom-validators';
import { monthValidator } from './month.validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Order } from 'src/app/shared/order';
import { Bookings } from 'src/app/shared/bookings';
import { Person } from 'src/app/shared/person';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})

export class PaymentsPageComponent implements OnInit {

  paymentForm: FormGroup;
  ticket: Bookings;
  price: number;
  passengers: Person[];
  amount: number;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.paymentForm = this.fb.group({
      bank: ['', Validators.required],
      name: ['', Validators.required],
      cardNo: ['', [Validators.required, CustomValidators.creditCard]],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });

  }

  ngOnInit() {
    this.store.pipe(
      map(state => state.selectedTicket.ticket)
    ).subscribe(res =>{ 
      this.ticket = res;
      this.price = res.price;
      this.passengers = res.passengers;
      this.amount = this.price * this.passengers.length;

    });
  }


  get bank() {
    return this.paymentForm.get('bank');
  }

  get name() {
    return this.paymentForm.get('name');
  }

  get cardNo() {
    return this.paymentForm.get('cardNo');
  }

  get month() {
    return this.paymentForm.get('month');
  }

  get year() {
    return this.paymentForm.get('year');
  }

  get cvv() {
    return this.paymentForm.get('cvv');
  }

}


