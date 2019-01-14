import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = 'http://localhost:3000/api/register';
  constructor( private _http : HttpClient) { }

  postUser(newUser : User){
    return this._http.post<any>(this.registerUrl,newUser);
  }
}                      
