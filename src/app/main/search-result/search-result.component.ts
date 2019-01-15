import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../../server/models/order';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  inputs:['searchQuery']
})
export class SearchResultComponent implements OnInit {

  source = "SHILLONG";
  destination = "GUWAHATI";

  searchOptions = ["One Way","12/12/2018","1"];

  sortOptions = ["Time : Earliest","Time : Last","Price : Low to High","Price : High to Low"];
  selectedSortOption = "Time : Earliest";
  constructor() { }

  ngOnInit() {
  }

  @Input() searchQuery:any;

}
