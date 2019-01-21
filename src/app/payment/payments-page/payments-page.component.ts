import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})

export class PaymentsPageComponent implements OnInit {
  monthCtrl = new FormControl();
  filteredMonths: Observable <Month[]>;
  
  constructor(private fb: FormBuilder) { 
    this.filteredMonths = this.monthCtrl.valueChanges
      .pipe(
        startWith(''),
        map(month => month ? this._filterMonths(month) : this.months.slice())
      );

  }

  ngOnInit() {
  }

  months: Month[] = [
    {
      name: 'January',
      number: '01'
    },
    {
      name: 'February',
      number: '02'
    },
    {
      name: 'March',
      number: '03'
    },
    {
      name: 'April',
      number: '04'
    },
    {
      name: 'May',
      number: '05'
    },
    {
      name: 'June',
      number: '06'
    },
    {
      name: 'July',
      number: '07'
    },
    {
      name: 'August',
      number: '08'
    },
    {
      name: 'September',
      number: '09'
    },
    {
      name: 'October',
      number: '10'
    },{
      name: 'November',
      number: '11'
    },
    {
      name: 'December',
      number: '12'
    }
  ];

  private _filterMonths(value: string): Month[] {
    const filterValue = value.toLowerCase();
    return this.months.filter(month => month.name.toLowerCase().indexOf(filterValue) === 0);
  }

}

export interface Month {
  name: string;
  number: string;
}

