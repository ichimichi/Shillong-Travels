import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import {  AuthService } from 'src/app/services/auth.service';
import { AuthStatusService } from 'src/app/services/auth-status.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  // loggedIn: boolean;

  constructor(private authService: AuthService,
    public authStatusService: AuthStatusService) {
    // this.loggedIn = this.authStatusService.isLoggedIn()
  }

  ngOnInit() {

  }

  logOut() {
    this.authService.logoutUser()
  }

}
