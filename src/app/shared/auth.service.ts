import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt';
import {UserI} from '../dtd/userI';

@Injectable()
export class AuthService {

  storageKey: String = 'contact-manager-jwt';

  jwtHelper: JwtHelper = new JwtHelper();
  private user: UserI;

  constructor(private router: Router) {
    console.log('constructor AuthService');
   if (this.getToken()) {
     this.initToken();
   }
  }

  setToken(token: string) {
    localStorage.setItem(this.storageKey.toString(), token);
    this.useJwtHelper();
    this.initToken();
  }
  initToken() {
    const payload = this.getPayloadFromToken();
    console.log('payload.admin ' + payload.admin);
    this.user =  {
      userName: payload.username,
      admin: payload.admin,
      role: payload.role || payload.admin === true ? 'admin' : '',
      enabled: payload.enabled || true
    };
  }

  useJwtHelper() {
    const token = this.getToken();

    console.log(
      this.jwtHelper.decodeToken(token)
    );
    console.log(
      this.jwtHelper.getTokenExpirationDate(token)
    );
    console.log(
      this.jwtHelper.isTokenExpired(token)
    );
  }

  getPayloadFromToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  getToken() {
    return localStorage.getItem(this.storageKey.toString());
  }

  isLoggedIn() {
    console.log('isLoggedIn() ' + this.getToken());
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.storageKey.toString());
    this.router.navigate(['/login']);
  }

  isItAdmin() {
    return this.user.admin === true ? true : false;
  }

  getUserName() {
    if (!this.user) {
      return 'Non authorized';
    }
    return this.user.userName || 'Non authorized';
  }
  getUser() {
    return this.user;
  }

}