import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  clickinput = 1;
  constructor() { }

  ngOnInit() {
  }
  incrementNP() {
    this.clickinput = this.clickinput + 1;
  }
  decrementNP() {
    if(this.clickinput>1){
      this.clickinput = this.clickinput - 1;
    }
  }
}
