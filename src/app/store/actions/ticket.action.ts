import { Action } from '@ngrx/store';
import { Bookings } from 'src/app/shared/bookings';

export enum selectedTicketActionTypes {
  AddTicket = '[Ticket] Add Ticket',
}

export class AddSelectedTicket implements Action {
  readonly type = selectedTicketActionTypes.AddTicket;

  constructor(public payload: Bookings ){}
}

export type TicketActions = AddSelectedTicket;
