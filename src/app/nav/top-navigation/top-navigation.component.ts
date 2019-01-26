import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  loggedIn: boolean;

  constructor(private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn()
  }

  ngOnInit() {

  }

  logOut() {
    this.authService.logoutUser()
  }

}
