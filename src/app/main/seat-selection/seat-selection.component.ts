import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.scss']
})
export class SeatSelectionComponent implements OnInit {
  selected: Array<number> = [];
  availability= [true, false, true, false, true];
  // availability = [true, false, true, false, true, true, false, true, false, true];
  passengers = 2;
  constructor(public snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  select(seat: number) {
    if (this.selected.includes(seat)) {
      this.selected.splice(this.selected.indexOf(seat), 1);
    } else {
      if(this.selected.length < this.passengers){
        this.selected.push(seat);
      }else{
        this.snackbar.open('Can\'t select anymore seats. If you wish to change selection , un-select a selected seat','',{duration:1000});
      }
    }
    
    //this.availability[seat] = false;
  }

  showOccupied(){
    this.snackbar.open('Seat already occupied. Please Select a vacant seat','',{duration:1000});
  }

  showDriver(){
    this.snackbar.open('Driver seat can\'t be selected','',{duration:1000});
  }

}
