import { Action } from '@ngrx/store';
import { Order } from 'src/app/shared/order';

export enum SelectedBookingActionTypes {
  AddSelectedBooking = '[SelectedBooking] Add Booking',
  RemoveSelectedBooking = '[SelectedBooking] Remove Booking'
}

export class AddSelectedBooking implements Action {
  readonly type = SelectedBookingActionTypes.AddSelectedBooking;

  constructor(public payload: Order ){}
}

export type BookingActions = AddSelectedBooking;
