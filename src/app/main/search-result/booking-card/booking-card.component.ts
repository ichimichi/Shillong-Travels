import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';


@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  inputs: ['availableBookings']
})
export class BookingCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //availableBookings: Order[];

}
