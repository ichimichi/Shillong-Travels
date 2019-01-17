import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { map } from 'rxjs/operators';
import { SearchQuery } from 'src/app/store/models/search-query.model';
import { Query } from 'src/app/shared/query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  source = "SHILLONG";
  destination = "GUWAHATI";

  searchOptions = ["One Way","12/12/2018","1"];

  sortOptions = ["Time : Earliest","Time : Last","Price : Low to High","Price : High to Low"];
  selectedSortOption = "Time : Earliest";

  
  searchQuery$: Observable<SearchQuery>;
  searched$:Observable<boolean>;
  query$: Observable<Query>;
  // query: Array<SearchQuery>;

  constructor(private store:Store<AppState>) {
   }

  ngOnInit() {
    // this.queryObs.subscribe( res => this.query = res)
    // console.log(this.query[0]);

    this.searchQuery$ = this.store
      .pipe(
        map(state => state.searchQuery)
      );

    this.searched$ = this.searchQuery$.pipe(map(sq=>sq.searched));
    this.query$ = this.searchQuery$.pipe(map(sq => sq.query));
    
  }

}
