import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { SearchQuery } from '../models/search-query.model';
import { SearchQueryActionTypes, SearchQueryActions } from '../actions/search-query.actions';
import { Query } from 'src/app/shared/query';
import { Order } from 'src/app/shared/order';
import { SelectedBookingActionTypes, BookingActions  } from '../actions/booking-order.action';

type SearchState = {
  searched:boolean,
  query: Query
}

type SelectedBookingState = {
  selected:boolean,
  order: Order
}

const initialSearchState: SearchState = {
  searched: false,
  query : undefined
}

const initialSelectedBookingState: SelectedBookingState = {
  selected: false,
  order : undefined
}
export interface AppState {
  searchQuery : SearchState,
  selectedBooking : SelectedBookingState
}

function searchQueryReducer(state: SearchState = initialSearchState, action:SearchQueryActions):SearchState{
  switch(action.type){
    case SearchQueryActionTypes.AddSearchQuery:
      return {
        searched: true,
        query: action.payload
      }

    default:
      return state;
  }
}

function selectedBookingReducer(state: SelectedBookingState = initialSelectedBookingState, action:BookingActions):SelectedBookingState{
  switch(action.type){
    case SelectedBookingActionTypes.AddSelectedBooking:
      return {
        selected: true,
        order: action.payload
      }

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  searchQuery : searchQueryReducer,
  selectedBooking : selectedBookingReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];