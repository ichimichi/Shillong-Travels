import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { DetailsComponent } from './details/details.component';
import { MatBottomSheet } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { AddSelectedBooking } from 'src/app/store/actions/booking-order.action';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  inputs: ['availableBookings']
})
export class BookingCardComponent implements OnInit {
  selected: Order;
  constructor(private bottomSheet: MatBottomSheet,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
  }

  openBottomSheet(booking: Order): void {
    this.selected = booking;
    this.store.dispatch(new AddSelectedBooking(this.selected));
    this.bottomSheet.open(DetailsComponent);
  }

  bookingSelected(booking: Order):void {
    this.selected = booking;
    this.store.dispatch(new AddSelectedBooking(this.selected));
    this.router.navigate(['selection']);
  }

  //availableBookings: Order[];

}