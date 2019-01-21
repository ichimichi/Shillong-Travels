import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectedBookingOrder } from 'src/app/store/models/booking-order.model';
import { Order } from 'src/app/shared/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  selected$: Observable<Order>;
  booking: Order;
  constructor(private bottomSheetRef: MatBottomSheetRef<DetailsComponent>,
    private store: Store<AppState>,
    private router: Router) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
    this.selected$ = this.store
      .pipe(
        map(state => state.selectedBooking.order)
      );

    this.selected$.subscribe(
      res => this.booking = res
    );
  }

  bookingSelected() {
    this.bottomSheetRef.dismiss();
    this.router.navigate(['selection']);
  }

}
