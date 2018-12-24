import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DestinationValidator } from './destination-validator';

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

  constructor(private fb: FormBuilder) {
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

  searchForm = this.fb.group({
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    type: ['', Validators.required],
    departure_date: ['', Validators.required],
    return_date: [''],
    no_of_passengers: ['', Validators.min(1)]
  }, { validator: DestinationValidator })

  get origin() {
    return this.searchForm.get('origin');
  }

  get destination() {
    return this.searchForm.get('destination');
  }

  get type() {
    return this.searchForm.get('type');
  }

  get dept_date() {
    return this.searchForm.get('departure_date');
  }

  get NOP() {
    return this.searchForm.get('no_of_passengers');
  }

  get return_date()
  {
    return this.searchForm.get('return_date');
  }
}
