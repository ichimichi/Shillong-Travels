import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Bookings } from 'src/app/shared/bookings';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-bottom-sheet',
  templateUrl: './user-bottom-sheet.component.html',
  styleUrls: ['./user-bottom-sheet.component.css']
})
export class UserBottomSheetComponent implements OnInit {
  
  booking: Bookings;

  constructor(private bottomSheetRef: MatBottomSheetRef<UserBottomSheetComponent>,
    private store:Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(
      map( state => state.selectedTicket.ticket)
    ).subscribe(
      ticket => this.booking = ticket
    )
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
