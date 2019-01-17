import { Action } from '@ngrx/store';
import { SearchQuery } from '../models/search-query.model';
import { Query } from 'src/app/shared/query';

export enum SearchQueryActionTypes {
  AddSearchQuery = '[SearchQuery] Add SearchQuery',
  RemoveSearchQuery = '[SearchQuery] Remove SearchQuery'
}

export class AddSearchQuery implements Action {
  readonly type = SearchQueryActionTypes.AddSearchQuery;

  constructor(public payload: Query ){}
}

export type SearchQueryActions = AddSearchQuery;
