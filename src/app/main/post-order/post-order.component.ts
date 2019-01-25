import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DestinationValidator } from './destination-validators';
import { map, startWith } from 'rxjs/operators';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-order',
  templateUrl: './post-order.component.html',
  styleUrls: ['./post-order.component.css']
})
export class PostOrderComponent implements OnInit {
  postorder = false;
  postOrderForm: FormGroup;

  originGroups: OriginGroup[] = [{
    letter: 'D',
    locations: ['Dimapur']
  }, {
    letter: 'G',
    locations: ['Guwahati']
  },
  {
    letter: 'J',
    locations: ['Jorhat', 'Jowai']
  },
  {
    letter: 'N',
    locations: ['Nongpoh']
  },
  {
    letter: 'S',
    locations: ['Shillong', 'Sohra', 'Siliguri']
  },
  {
    letter: 'T',
    locations: ['Tura']
  },
  {
    letter: 'W',
    locations: ['Williamnagar']
  }];

  destinationGroups: DestinationGroup[] = [{
    letter: 'D',
    places: ['Dimapur']
  }, {
    letter: 'G',
    places: ['Guwahati']
  },
  {
    letter: 'J',
    places: ['Jorhat', 'Jowai']
  },
  {
    letter: 'N',
    places: ['Nongpoh']
  },
  {
    letter: 'S',
    places: ['Shillong', 'Sohra', 'Siliguri']
  },
  {
    letter: 'T',
    places: ['Tura']
  },
  {
    letter: 'W',
    places: ['Williamnagar']
  }];

  originGroupOptions: Observable<OriginGroup[]>;
  destinationGroupOptions: Observable<DestinationGroup[]>;

  hours = [];
  minutes = [];
  dep_selectedHour = null;
  dep_selectedMinutes = null;
  dep_selectedAmPm = null;

  arr_selectedHour = null;
  arr_selectedMinutes = null;
  arr_selectedAmPm = null;

  constructor(private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router,
    public snackbar: MatSnackBar) {
      this.hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      this.minutes = new Array(60).fill(0).map((v, i) => { return ('0' + i).substr(-2, 2) });
     }

  ngOnInit() {
    this.postOrderForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      type: ['', Validators.required],
      departure: ['', Validators.required],
      arrival: [''],
      agency: ['', [Validators.required, Validators.minLength(2)]],
      available:[],
      price: ['', Validators.required],
      vehicle: this.fb.group({
        model:[''],
        plateNumber: [''],
        ac: []        
      }),
      driver: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        email: ['', Validators.required],
        contact: ['', [Validators.required, Validators.minLength(10)]],
      })

    }, { validator: DestinationValidator });


    this.originGroupOptions = this.postOrderForm.get('origin')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );

    this.destinationGroupOptions = this.postOrderForm.get('destination')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterG(value))
      );
  }

  onSubmit() {
    if (this.postOrderForm.value.type === 'sumo') {

      this.postOrderForm.value.available = [true, true, true, true, true, true, true, true, false, true]

    }
    else if (this.postOrderForm.value.type === 'bus') {

      this.postOrderForm.value.available = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true]
    }
    else {

      this.postOrderForm.value.available = [true, true, true, false, true]
    }

    this.postOrderForm.value.departure = this.postOrderForm.value.departure.toString();

    //Setting the time of the Date object to the selected time
    var temp = new Date(Date.parse(this.postOrderForm.value.departure));
    temp.setHours((this.dep_selectedAmPm == 0)? parseInt(this.dep_selectedHour) : parseInt(this.dep_selectedHour)+12);
    temp.setMinutes(this.dep_selectedMinutes);

    // console.log("dep",temp);
    this.postOrderForm.value.departure = temp.toString();

    temp.setHours((this.arr_selectedAmPm == 0) ? parseInt(this.arr_selectedHour) : parseInt(this.arr_selectedHour)+12);
    temp.setMinutes(this.arr_selectedMinutes);
    // console.log("arr",temp);
    this.postOrderForm.value.arrival = temp.toString();

    this.postOrderForm.value.driver.dateOfBirth = this.postOrderForm.value.driver.dateOfBirth.toString();

    console.log(this.postOrderForm.value);
    this.ordersService.postOrder(this.postOrderForm.value)
      .subscribe(
        res => {
          // console.log('success', res);
          this.snackbar.open('Successfully Posted Order', '', { duration: 1000 });
          // this.router.navigate(['/home']);
        },
        err => {
          this.snackbar.open('Unable to post Order', '', { duration: 1000 });
          // console.log('error', err);
        }
      );
  }

  get origin() {
    return this.postOrderForm.get('origin');
  }

  get destination() {
    return this.postOrderForm.get('destination');
  }

  get carType() {
    return this.postOrderForm.get('type');
  }

  get dept_date() {
    return this.postOrderForm.get('departure');
  }

  get return() {
    return this.postOrderForm.get('arrival');
  }

  get agencyName() {
    return this.postOrderForm.get('agency');
  }

  get price() {
    return this.postOrderForm.get('price');
  }

  get v_model() {
    return this.postOrderForm.get('vehicle.model');
  }

  get v_plateNo() {
    return this.postOrderForm.get('vehicle.plateNumber');
  }

  get v_ac() {
    return this.postOrderForm.get('vehicle.ac');
  }

  get d_firstName() {
    return this.postOrderForm.get('driver.firstName');
  }

  get d_lastName() {
    return this.postOrderForm.get('driver.lastName');
  }

  get d_gender() {
    return this.postOrderForm.get('driver.gender');
  }

  get d_dob() {
    return this.postOrderForm.get('driver.dateOfBirth');
  }

  get d_email() {
    return this.postOrderForm.get('driver.email');
  }

  get d_contact() {
    return this.postOrderForm.get('driver.contact');
  }

  private _filterGroup(value: string): OriginGroup[] {
    if (value) {
      return this.originGroups
        .map(group => ({ letter: group.letter, locations: _filter(group.locations, value) }))
        .filter(group => group.locations.length > 0);
    }
    return this.originGroups;
  }

  private _filterG(value: string): DestinationGroup[] {
    if (value) {
      return this.destinationGroups
        .map(group => ({ letter: group.letter, places: _filter(group.places, value) }))
        .filter(group => group.places.length > 0);
    }
    return this.destinationGroups;
  }

}

export interface OriginGroup {
  letter: string;
  locations: string[];
}

export interface DestinationGroup {
  letter: string;
  places: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};