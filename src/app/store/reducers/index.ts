import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { SearchQueryActionTypes, SearchQueryActions } from '../actions/search-query.actions';
import { Query } from 'src/app/shared/query';
import { Order } from 'src/app/shared/order';
import { SelectedBookingActionTypes, BookingActions } from '../actions/booking-order.action';
import { Bookings } from 'src/app/shared/bookings';
import { selectedTicketActionTypes, TicketActions } from '../actions/ticket.action';

type SearchState = {
  searched: boolean,
  query: Query
}

type SelectedBookingState = {
  selected: boolean,
  order: Order
}

type SelectedTicketState = {
  completed: boolean,
  ticket: Bookings
}

const initialSearchState: SearchState = {
  searched: false,
  query: undefined
}

const initialSelectedBookingState: SelectedBookingState = {
  selected: false,
  order: undefined
}

const initialSelectedTicketState: SelectedTicketState = {
  completed: false,
  ticket: undefined
}

export interface AppState {
  searchQuery: SearchState,
  selectedBooking: SelectedBookingState,
  selectedTicket: SelectedTicketState
}

export function searchQueryReducer(state: SearchState = initialSearchState, action: SearchQueryActions): SearchState {
  switch (action.type) {
    case SearchQueryActionTypes.AddSearchQuery:
      return {
        searched: true,
        query: action.payload
      }

    default:
      return state;
  }
}

export function selectedBookingReducer(state: SelectedBookingState = initialSelectedBookingState, action: BookingActions): SelectedBookingState {
  switch (action.type) {
    case SelectedBookingActionTypes.AddSelectedBooking:
      return {
        selected: true,
        order: action.payload
      }

    default:
      return state;
  }
}

export function selectedTicketReducer(state: SelectedTicketState = initialSelectedTicketState, action: TicketActions): SelectedTicketState {
  switch (action.type) {
    case selectedTicketActionTypes.AddTicket:
      return {
        completed: true,
        ticket: action.payload
      }
    case selectedTicketActionTypes.RemoveTicket:
      return {
        completed: false,
        ticket: undefined
      }
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  searchQuery: searchQueryReducer,
  selectedBooking: selectedBookingReducer,
  selectedTicket: selectedTicketReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];