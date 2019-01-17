import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DestinationValidator } from './destination-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { AddSearchQuery } from 'src/app/store/actions/search-query.actions';

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
  searched=false;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  searchForm: FormGroup;
  states: State[] = [
    {
      name: 'shillong',
      country: 'India'
    },
    {
      name: 'guwahati',
      country: 'India'
    },
    {
      name: 'tura',
      country: 'India'
    }
  ];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  ngOnInit() {

    this.searchForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      type: ['', Validators.required],
      departure: ['', Validators.required],
      return: [{ value: '', disabled: true }],
      passengers: [1, Validators.min(1)]
      }, { validator: DestinationValidator });

    this.searchForm.controls['type'].valueChanges.subscribe(val => {
      if (val === 'round') {
        this.searchForm.controls.return.enable();
      }
      else {
        this.searchForm.controls.return.disable();
      }
    });
  }

  onSubmit() {
    this.store.dispatch(new AddSearchQuery(this.searchForm.value));
  }

  incrementNP() {
    this.searchForm.controls['passengers'].setValue(<number>this.searchForm.controls['passengers'].value + 1);
  }
  decrementNP() {
    if (this.searchForm.controls['passengers'].value > 1) {
      this.searchForm.controls['passengers'].setValue(<number>this.searchForm.controls['passengers'].value - 1);
    }
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

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
    return this.searchForm.get('departure');
  }

  get NOP() {
    return this.searchForm.get('passengers');
  }

  get return() {
    return this.searchForm.get('return');
  }

  
}
