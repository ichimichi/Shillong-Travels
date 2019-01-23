import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getProfileURL = 'http://localhost:3000/user/profile' 

  constructor(private _http: HttpClient) { }

  getProfile() {
    return this._http.get<any>(this.getProfileURL);
  }
}
