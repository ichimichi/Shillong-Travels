import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from '../shared/query';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  getOrdersUrl = "http://localhost:3000/api/orders";
  
  constructor(private _http : HttpClient) { }

  getBookings(query: Query){
    query.departure = query.departure.substring(0,10);
    this.getOrdersUrl = this.getOrdersUrl + "?o=" + query.origin + "&d=" + query.destination + "&dep=" + query.departure + "&n=" + query.passengers; 
    console.log(this.getOrdersUrl);
    return this._http.get<any>(this.getOrdersUrl);
  }
}