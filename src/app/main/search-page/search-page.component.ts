import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface State {
  name: string;
  country: string;
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  clickinput = 1;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Shillong',
      country: 'India'
    },
    {
      name: 'Guwahati',
      country: 'India'
    },
    {
      name: 'Tura',
      country: 'India'
    }
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  ngOnInit() {
  }
  incrementNP() {
    this.clickinput = this.clickinput + 1;
  }
  decrementNP() {
    if (this.clickinput > 1) {
      this.clickinput = this.clickinput - 1;
    }
  }
  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
