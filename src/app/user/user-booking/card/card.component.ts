import { Component, OnInit, Input } from '@angular/core';
import { Bookings } from 'src/app/shared/bookings';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  inputs: ['bookings']
})
export class CardComponent implements OnInit {
  show: boolean = false;
  @Input() bookings: Bookings[];
  constructor() { }

  ngOnInit() {
  }

  showMore() {
    this.show = !this.show;
  }
}
