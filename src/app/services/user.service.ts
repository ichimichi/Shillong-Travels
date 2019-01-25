import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';
import { Bookings } from '../shared/bookings';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getProfileURL = 'http://localhost:3000/user/profile'

  updateProfileUrl = 'http://localhost:3000/user/edit'

  getBookingURL = 'http://localhost:3000/user/bookings'

  postBookingURL = 'http://localhost:3000/user/bookings'
  
  constructor(private _http: HttpClient) { }

  getProfile() {
    return this._http.get<any>(this.getProfileURL);
  }

  getBooking() {
    return this._http.get<any>(this.getBookingURL);
  }

  updateProfile(newProfile: Update) {
    return this._http.put<any>(this.updateProfileUrl, newProfile);
  }

  updatePassword(newPass: Password) {
    return this._http.put<any>(this.updateProfileUrl, newPass);
  }

  postBooking(booking: Bookings) {
    return this._http.post<any>(this.getBookingURL, booking);
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

