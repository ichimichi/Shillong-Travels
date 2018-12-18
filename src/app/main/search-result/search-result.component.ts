import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  source = "SHILLONG";
  destination = "GUWAHATI";

  searchOptions = ["One Way","12/12/2018","1"];

  sorting = ["Time : Earliest","Time : Last","Price : Low to High","Price : High to Low"];
  selected = "Time : Earliest";
  constructor() { }

  ngOnInit() {
  }

}
