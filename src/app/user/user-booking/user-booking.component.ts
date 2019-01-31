import { Component, OnInit } from '@angular/core';
import { Bookings } from 'src/app/shared/bookings';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements OnInit {

  loaded = false;
  myBookings: Bookings[];
  upcoming: Bookings[];
  completed: Bookings[];
  cancelled: Bookings[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getBooking().subscribe(
      res => {
        this.myBookings = res.bookings;
        this.upcoming = this.myBookings.filter(booking => booking.status === "upcoming" || booking.status === "cancelled" );
        // this.completed = this.myBookings.filter(booking => booking.status === "completed");
        // this.cancelled = this.myBookings.filter(booking => booking.status === "cancelled");
        this.loaded = true;
        console.log(res);
      },
      err => { console.log(err) }
    );
  }

  sortOptions = ["Time : Earliest", "Time : Last", "Price : Low to High", "Price : High to Low"];
  selectedSortOption = "Time : Earliest";

}


