import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../shared/contact-details';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url= "https://contact-shillong-travels.prod.with-datafire.io/contact";

  constructor(private _http: HttpClient) { }

  contact(emailAddress: string, message: string, issue:string ){
    return this._http.post<any>(this.url, { emailAddress: emailAddress, message: message, issue: issue });
  }
}
