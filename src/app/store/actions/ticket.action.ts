import { Action } from '@ngrx/store';
import { Bookings } from 'src/app/shared/bookings';

export enum selectedTicketActionTypes {
  AddTicket = '[Ticket] Add Ticket',
  RemoveTicket = '[Ticket] Remove Ticket'
}

export class AddSelectedTicket implements Action {
  readonly type = selectedTicketActionTypes.AddTicket;

  constructor(public payload: Bookings ){}
}

export class RemoveSelectedTicket implements Action {
  readonly type = selectedTicketActionTypes.RemoveTicket;

  constructor(){}
}

export type TicketActions = AddSelectedTicket | RemoveSelectedTicket;
