import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DestinationValidator } from './destination-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { AddSearchQuery } from 'src/app/store/actions/search-query.actions';

export interface StateGroup {
  letter:string;
  locations: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searched=false;
  searchForm: FormGroup;

  stateGroups: StateGroup[] = [{
    letter: 'D',
    locations: ['Dimapur']
  }, {
    letter: 'G',
    locations: ['Guwahati']
  },
{
  letter: 'J',
  locations: ['Jorhat','Jowai']
},
{
  letter:'N',
  locations:['Nongpoh']
},
{
  letter: 'S',
  locations:['Shillong','Sohra','Siliguri']
},
{
  letter:'T',
  locations:['Tura']
},
{
  letter:'W',
  locations:['Williamnagar']
}];

stateGroupOptions: Observable<StateGroup[]>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
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

      this.stateGroupOptions = this.searchForm.get('origin')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

      this.stateGroupOptions = this.searchForm.get('destination')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

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

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, locations: _filter(group.locations, value)}))
        .filter(group => group.locations.length > 0);
    }

    return this.stateGroups;
  }
  
}
