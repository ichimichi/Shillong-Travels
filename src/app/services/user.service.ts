import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getProfileUrl = 'http://localhost:3000/user/profile'
  updateProfileUrl= 'http://localhost:3000/user/edit'
  updatePasswordUrl= 'http://localhost:3000/user/password'
  getBookingURL = 'http://localhost:3000/user/bookings'
  
  constructor(private _http: HttpClient) { }

  getProfile() {
    return this._http.get<any>(this.getProfileUrl);
  }

  getBooking() {
    return this._http.get<any>(this.getBookingURL);
  }

  updateProfile(newProfile: Update) {
    return this._http.put<any>(this.updateProfileUrl, newProfile);
  }

  updatePassword(newPass: Password) {
    return this._http.put<any>(this.updatePasswordUrl, newPass );
  }

}

interface Password {
  opassword: string;
  npassword: string;
}

interface Update {
  email: string;
  phone: string;
}

