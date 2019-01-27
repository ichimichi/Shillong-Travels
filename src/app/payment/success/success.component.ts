import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Bookings } from 'src/app/shared/bookings';
import { UserService } from 'src/app/services/user.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  loaded = false;
  success = true;
  ticket: Bookings;
  recievedTicket: Bookings;
  selected: number[];

  constructor(private store: Store<AppState>,
    private userService: UserService,
    private orderService: OrdersService) { }

  ngOnInit() {
    this.store.pipe(map(state => state.selectedTicket.ticket)).subscribe(
      res => {
        this.ticket = res;
        this.userService.postBooking(this.ticket).subscribe(
          res => {
            this.recievedTicket = res;
            for (let seat of res.selection) {
              this.orderService.bookSeat(res.order_id, seat);
            }
            this.loaded = true;
          },
          err => {
            console.log(err);
          }
        )
        // this.loaded = true;
      }
    )




  }

  info = {
    title: "Mr.",
    name: { "firstName": "Peter", "lastName": "Law" },
    origin: "Shillong",
    destination: "Guahati",
    bookingId: "12345",
    type: "one-way"
  };
}
