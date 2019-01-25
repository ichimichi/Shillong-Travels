import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  success=true;

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
