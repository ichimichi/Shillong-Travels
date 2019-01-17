import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { map } from 'rxjs/operators';
import { SearchQuery } from 'src/app/store/models/search-query.model';
import { Query } from 'src/app/shared/query';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  source = "SHILLONG";
  destination = "GUWAHATI";

  searchOptions : Array<String>;

  sortOptions = ["Time : Earliest","Time : Last","Price : Low to High","Price : High to Low"];
  selectedSortOption = "Time : Earliest";

  
  searchQuery$: Observable<SearchQuery>;
  searched$:Observable<boolean>;
  query$: Observable<Query>;
  availableBookings : Array<Order>;
  query: Query;

  constructor(private store:Store<AppState>, private order: OrdersService) {
  
  }

  ngOnInit() {
    
    this.searchQuery$ = this.store
      .pipe(
        map(state => state.searchQuery)
      );

    this.searched$ = this.store
    .pipe(
      map(state => state.searchQuery.searched)
    );

    this.query$ = this.store
    .pipe(
      map(state => state.searchQuery.query)
    );
    
    this.query$.subscribe( res => {this.query = res; this.searchOptions = [this.query.departure, this.query.passengers.toString()]});

    this.order.getBookings(this.query).subscribe( 
      res => {console.log("1",res); this.availableBookings = res; console.log("2",this.availableBookings)}, 
      err => console.log(err)
    );
    
  }

}
