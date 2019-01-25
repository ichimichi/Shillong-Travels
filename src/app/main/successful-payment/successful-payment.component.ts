import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-successful-payment',
  templateUrl: './successful-payment.component.html',
  styleUrls: ['./successful-payment.component.scss']
})
export class SuccessfulPaymentComponent implements OnInit {

  //Dummy values for testing to be replaced later
  success=false;
  failed=false;
  loading=true;

  constructor(private store: Store<AppState>){}

  ngOnInit() {
    //this.store.subscribe(state => console.log("state", state));
  }

  info={
    name: {"firstName": "Peter", "lastName": "Law"},
    origin: "Shillong",
    destination: "Guahati",
    bookingId: "12345",
    type: "one-way"
  };

  // onSubmit(){
  //   this.store.dispatch();
  // }

}
