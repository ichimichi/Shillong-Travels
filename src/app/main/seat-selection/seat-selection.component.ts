import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { MatVerticalStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Query } from 'src/app/shared/query';
import { Order } from 'src/app/shared/order';
import { Bookings } from 'src/app/shared/bookings';
import { Router } from '@angular/router';
import { AddSelectedTicket, RemoveSelectedTicket } from 'src/app/store/actions/ticket.action';
import { Person } from 'src/app/shared/person';


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

  availability: boolean[];
  npassenger: number;
  price: number;
  book = false;
  query: Query;
  order: Order;

  ticket: Bookings;
  passengers: Person[];
  amount: number;

  genders: gender[] = [
    { value: 'female', viewValue: 'Miss' },
    { value: 'female', viewValue: 'Mrs.' },
    { value: 'male', viewValue: 'Mr.' }
  ];

  constructor(public snackbar: MatSnackBar,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    this.store.pipe(map(state => state.searchQuery.query.passengers))
      .subscribe(passenger => this.npassenger = passenger);

    this.store.pipe(map(state => state.selectedBooking.order.price))
      .subscribe(price => this.price = price);

    this.store.pipe(map(state => state.searchQuery.query))
      .subscribe(res => this.query = res);

    this.store.pipe(map(state => state.selectedBooking.order))
      .subscribe(res => { this.order = res; this.availability = res.available });

    this.store.pipe(
      map(state => state.selectedTicket.ticket))
      .subscribe(res => {
        this.ticket = res;
        this.price = res.price;
        this.passengers = res.passengers;
        this.amount = this.price * this.passengers.length;

      });

    this.passengersForm = this.fb.group({
      passenger: this.fb.array([])
    });

    for (let i = 0; i < this.npassenger; i++) {
      this.passenger.push(this.createPassenger());
    }

    this.seatSelectForm = this.fb.group({
      selected: ['', [Validators.required]]
    })


    this.initConfig();
  }

  normalPayment() {
    let ticket: Bookings = {
      origin: this.order.origin,
      destination: this.order.destination,
      departure: this.order.departure,
      agency: this.order.agency,
      arrival: this.order.arrival,
      type: this.order.type,
      price: this.order.price,
      vehicle: {
        model: this.order.vehicle.model,
        plateNumber: this.order.vehicle.plateNumber,
        ac: this.order.vehicle.ac
      },
      driver: {
        firstName: this.order.driver.firstName,
        lastName: this.order.driver.lastName,
        gender: this.order.driver.gender,
        dateOfBirth: this.order.driver.dateOfBirth,
        email: this.order.driver.email,
        contact: this.order.driver.contact,
      },
      status: "pending",
      booking: (new Date()).toString(),
      passengers: this.passengersForm.value.passenger,
      payment: false,
      selection: this.selected,
      amount: this.order.price * this.selected.length,
      order_id: this.order._id
    };


    this.store.dispatch(new AddSelectedTicket(ticket));
    this.router.navigate(['/payments']);
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AYrhWD-z0hGvUKOfA5-JMvTrh5IBMWYlvIIEwNxXn0f9z2wQ5dqoZgW_BIxNoUm9o6Z9cbfjNxBuc29S'
      },
      button: {
        label: 'paypal',
        layout: 'vertical'
      },
      onAuthorize: (data, actions) => {
        console.log('Authorize');
        return of(undefined);
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
        let ticket: Bookings = {
          origin: this.order.origin,
          destination: this.order.destination,
          departure: this.order.departure,
          agency: this.order.agency,
          arrival: this.order.arrival,
          type: this.order.type,
          price: this.order.price,
          vehicle: {
            model: this.order.vehicle.model,
            plateNumber: this.order.vehicle.plateNumber,
            ac: this.order.vehicle.ac
          },
          driver: {
            firstName: this.order.driver.firstName,
            lastName: this.order.driver.lastName,
            gender: this.order.driver.gender,
            dateOfBirth: this.order.driver.dateOfBirth,
            email: this.order.driver.email,
            contact: this.order.driver.contact,
          },
          status: "upcoming",
          booking: (new Date()).toString(),
          passengers: this.passengersForm.value.passenger,
          payment: true,
          selection: this.selected,
          amount: this.order.price * this.selected.length,
          order_id: this.order._id
        };
        this.store.dispatch(new AddSelectedTicket(ticket));
        this.router.navigate(['/success']);
        console.log(ticket)

      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
        this.router.navigate(['/cancel']);
      },
      onError: (err) => {
        console.log(err);
      },
      onClick: () => {
        console.log('onClick');
      },
      validate: (actions) => {
        console.log(actions);
      },
      experience: {
        noShipping: true,
        brandName: 'Shillong Travels'
      },
      transactions: [{
        amount: {
          currency: 'INR',
          total: this.price * this.npassenger
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
      if (this.selected.length < this.npassenger) {
        this.selected.push(seat);
      } else {
        this.snackbar.open('Can\'t select anymore seats. If you wish to change selection , un-select a selected seat', '', { duration: 1000 });
      }
    }

    if (this.selected.length == this.npassenger) {
      // this.book = true;
      this.seatSelectForm.controls['selected'].setErrors(null)
    } else {
      // this.book = false;
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
