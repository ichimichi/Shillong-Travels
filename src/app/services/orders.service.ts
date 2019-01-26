import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from '../shared/query';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  getOrdersUrl = "http://localhost:8080/api/orders";

  postOrdersUrl = "http://localhost:8080/api/orders";
  
  constructor(private _http : HttpClient) { }

  getBookings(query: Query){
    query.departure = query.departure.toString().substring(0,15);
    this.getOrdersUrl = "http://localhost:3000/api/orders"
    this.getOrdersUrl = this.getOrdersUrl + "?o=" + query.origin + "&d=" + query.destination + "&dep=" + query.departure + "&n=" + query.passengers; 
    console.log(this.getOrdersUrl);
    return this._http.get<any>(this.getOrdersUrl);
  }

  postOrder(order: Order){
    return this._http.post<any>(this.postOrdersUrl, order);
  }
}