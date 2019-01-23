import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { MatVerticalStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
  addScript: boolean = false;

  @ViewChild(MatVerticalStepper) stepper: MatVerticalStepper;

  selected: Array<number> = [];
  passengerForm: FormGroup;
  passengersForm: FormGroup;
  seatSelectForm: FormGroup;

  availability = [true, false, true, false, true, true, false, true, false, true];
  passengers: number;
  price: number;
  book = false;

  passengers$: Observable<number>;
  price$: Observable<number>;

  genders: gender[] = [
    { value: 'female', viewValue: 'Miss' },
    { value: 'female', viewValue: 'Mrs.' },
    { value: 'male', viewValue: 'Mr.' }
  ];

  constructor(public snackbar: MatSnackBar, private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {

    this.store.pipe(map(state => state.searchQuery.query.passengers))
      .subscribe(passenger => this.passengers = passenger);

    this.store.pipe(map(state => state.selectedBooking.order.price))
      .subscribe(price => this.price = price);

    this.passengersForm = this.fb.group({
      passenger: this.fb.array([])
    });

    for (let i = 0; i < this.passengers; i++) {
      this.passenger.push(this.createPassenger());
    }

    this.seatSelectForm = this.fb.group({
      selected: ['', [Validators.required]]
    })

    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'Ae-9HVagUn-u9WTli6aAElOUf_A1hRR8AhT26TMraDwKQXiZQFd5mLfu9CEb_xCFXaUaTWLMmJUH8hbq'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'INR',
          total: this.price
        }
      }]
    });
  }
  
  createPassenger(): FormGroup {
    return this.fb.group({
      gender: [''],
      name: [''],
      age: ['']
    });
  }

  get passenger() {
    return this.passengersForm.get('passenger') as FormArray;
  }

  select(seat: number) {
    if (this.selected.includes(seat)) {
      this.selected.splice(this.selected.indexOf(seat), 1);
    } else {
      if (this.selected.length < this.passengers) {
        this.selected.push(seat);
      } else {
        this.snackbar.open('Can\'t select anymore seats. If you wish to change selection , un-select a selected seat', '', { duration: 1000 });
      }
    }

    if (this.selected.length === this.passengers) {
      this.book = true;
      this.seatSelectForm.controls['selected'].setErrors(null)
    } else {
      this.book = false;
      this.seatSelectForm.controls['selected'].setErrors({ required: true })

    }
  }

  showOccupied() {
    this.snackbar.open('Seat already occupied. Please Select a vacant seat', '', { duration: 1000 });
  }

  showDriver() {
    this.snackbar.open('Driver seat can\'t be selected', '', { duration: 1000 });
  }

  save() {
    console.log("Saving..");
  }
}
export interface gender {
  value: string;
  viewValue: string;
}
