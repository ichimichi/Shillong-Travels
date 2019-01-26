import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {

  constructor() { }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
