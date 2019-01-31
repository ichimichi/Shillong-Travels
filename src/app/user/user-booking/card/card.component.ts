import { Component, OnInit, Input } from '@angular/core';
import { Bookings } from 'src/app/shared/bookings';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { UserBottomSheetComponent } from '../user-bottom-sheet/user-bottom-sheet.component';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { store } from '@angular/core/src/render3';
import { AddSelectedTicket } from 'src/app/store/actions/ticket.action';

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
    private store:Store<AppState>) { }

  ngOnInit() {
  }

  showMore() {
    this.show = !this.show;
  }

  
  openBottomSheet(ticket: Bookings): void {
    this.store.dispatch(new AddSelectedTicket(ticket));
    this.bottomSheet.open(UserBottomSheetComponent);
  }
}
