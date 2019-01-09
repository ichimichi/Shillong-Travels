import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sortOptions = ["Time : Earliest", "Time : Last", "Price : Low to High", "Price : High to Low"];
  selectedSortOption = "Time : Earliest";

  UpcomingBookings: MyBooking[] = [
    {
      source: "Shillong",
      destination: "Guwahati",
      Status: "CONFIRMED",
      TravelDate: new Date("2019/01/12"),
      DepartureTime: new Date('06:00 00'),
    },
    {
      source: "Shillong",
      destination: "Tura",
      Status: "CONFIRMED",
      TravelDate: new Date("2019/1/25"),
      DepartureTime: new Date('07:00 00'),
    },
    {
      source: "Shillong",
      destination: "Guwahati",
      Status: "CONFIRMED",
      TravelDate: new Date("2019/01/14"),
      DepartureTime: new Date('08:00 00'),
    }
  ];

  PastBookings: MyBooking[] = [
    {
      source: "Shillong",
      destination: "Guwahati",
      Status: "COMPLETED",
      TravelDate: new Date("2018/11/12"),
      DepartureTime: new Date('06:00 00'),
    },
    {
      source: "Shillong",
      destination: "Tura",
      Status: "COMPLETED",
      TravelDate: new Date("2018/4/23"),
      DepartureTime: new Date('07:00 00'),
    },
    {
      source: "Shillong",
      destination: "Guwahati",
      Status: "CONFIRMED",
      TravelDate: new Date("2019/01/01"),
      DepartureTime: new Date('08:00 00'),
    }
  ];

}

export interface MyBooking {
  source: string,
  destination: string,
  Status: string,
  TravelDate: any,
  DepartureTime: any
}
