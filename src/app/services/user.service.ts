import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  getProfileURL = 'http://localhost:3000/user/profile'

  updateProfileUrl= 'http://localhost:3000/user/edit'

  constructor(private _http: HttpClient) { }

  getProfile() {
    return this._http.get<any>(this.getProfileURL);
  }

  updateProfile(newProfile: Update) {
    return this._http.put<any>(this.updateProfileUrl, newProfile );
  }

  updatePassword(newPass: Password) {
    return this._http.put<any>(this.updateProfileUrl, newPass );
  }

}

interface Password{
  opassword:string;
  npassword: string;
}

interface Update{
  email:string;
  phone: string;
}
