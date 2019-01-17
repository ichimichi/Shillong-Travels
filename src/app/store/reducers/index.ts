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

type SearchState = {
  searched:boolean,
  query: Query
}

const initialSearchState: SearchState = {
  searched: false,
  query : undefined
}
export interface AppState {
  searchQuery : SearchState
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

export const reducers: ActionReducerMap<AppState> = {
  searchQuery : searchQueryReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];