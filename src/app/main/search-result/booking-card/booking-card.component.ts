import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  availableBookings: Booking[] = [
    {
     source:"Shillong",
     destination: "Guwahati",
     departureTime: "600",
     arrivalTime : "900",
     availableSeats : 5,
     price : 200,
     agencyName : "Lei Suk Agency"
    },
    {
     source:"Shillong",
     destination: "Guwahati",
     departureTime: "700",
     arrivalTime : "1100",
     availableSeats : 4,
     price : 210,
     agencyName : "Shi Para Agency"
    }
  ];



}

export interface Booking{
  source:string,
  destination: string,
  departureTime: string,
  arrivalTime : string,
  availableSeats : number,
  price : number,
  agencyName : string
}
