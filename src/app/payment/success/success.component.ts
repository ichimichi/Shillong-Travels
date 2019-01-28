import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { map, switchMap, shareReplay, share } from 'rxjs/operators';
import { Bookings } from 'src/app/shared/bookings';
import { UserService } from 'src/app/services/user.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Observable } from 'rxjs';

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
  recievedTicket$: Observable<Bookings>;

  constructor(private store: Store<AppState>,
    private userService: UserService,
    private orderService: OrdersService) { }

  ngOnInit() {
    this.recievedTicket$ = this.store
      .pipe(
        map(state => state.selectedTicket.ticket),
        switchMap(ticket => {
          return this.userService.postBooking(ticket).pipe(shareReplay())
        }),
        // shareReplay()
      );

    this.store
      .pipe(
        map(state => state.selectedTicket.ticket),
        switchMap(ticket => {
          // for (let seat of ticket.selection) {
            // console.log(ticket.order_id, seat);
            return this.orderService.bookSeat(ticket.order_id, ticket.selection).pipe()
          // }
        }
        )
      ).subscribe();






  }





}
