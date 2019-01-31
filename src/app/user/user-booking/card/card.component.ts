import { Component, OnInit, Input } from '@angular/core';
import { Bookings } from 'src/app/shared/bookings';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UserBottomSheetComponent } from '../user-bottom-sheet/user-bottom-sheet.component';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { store } from '@angular/core/src/render3';
import { AddSelectedTicket } from 'src/app/store/actions/ticket.action';
import { UserService } from 'src/app/services/user.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  inputs: ['bookings']
})
export class CardComponent implements OnInit {
  show: boolean = false;
  @Input() bookings: Bookings[];
  constructor(private bottomSheet: MatBottomSheet,
    private userService: UserService,
    private orderService: OrdersService,
    private store: Store<AppState>,
    private sb: MatSnackBar) { }

  ngOnInit() {
    let currentDate = new Date();
    for (let booking of this.bookings) {
      let dept = new Date(booking.departure);
      if (dept.getTime() < currentDate.getTime() && booking.status !== 'cancelled') {
        booking.status = "completed";
      }
    }
  }

  showMore() {
    this.show = !this.show;
  }


  openBottomSheet(ticket: Bookings): void {
    this.store.dispatch(new AddSelectedTicket(ticket));
    this.bottomSheet.open(UserBottomSheetComponent);
  }

  cancel(booking: Bookings, index) {
    index = this.bookings.length - (index + 1);
    this.userService.cancelBooking(index).subscribe(
      (res) => {
        this.sb.open("Successfully Cancelled Booking", "", { duration: 1500 });
      },
      (err) => {
        this.sb.open("Error! Could not Cancel Booking", "", { duration: 1500 });
      },
      () => {
        this.orderService.unBookSeat(booking.order_id, booking.selection).
        subscribe();
      }
    );
  }


}
