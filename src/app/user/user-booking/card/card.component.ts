import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  inputs: ['bookings']
})
export class CardComponent implements OnInit {

  selected: Order;
  constructor() { }

  ngOnInit() {
  }

}
