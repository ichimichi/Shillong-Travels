import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { shareReplay, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  profile$: Observable<Profile>;
  title : string;
  
  constructor( private userService: UserService) { }

  ngOnInit() {

    this.profile$ = this.userService.getProfile().pipe(
      shareReplay()
    );
    this.profile$.subscribe(
      res => {
        this.title = res.gender;

        if (res.gender === 'female') {
          this.title = 'Miss'
        } else if (res.gender === 'male') {
          this.title = 'Mr.'
        }
      });

  }

}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
}