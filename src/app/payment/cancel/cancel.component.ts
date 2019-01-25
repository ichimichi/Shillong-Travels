import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  canceled=true;
  
  constructor() { }

  ngOnInit() {
  }

  info={
    title: "Mr.",
    name: {"firstName": "Peter", "lastName": "Law"},
    origin: "Shillong",
    destination: "Guahati",
    bookingId: "12345",
    type: "one-way"
  };
}
