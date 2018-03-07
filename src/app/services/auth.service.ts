import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable() 
export class AuthService {

  constructor(private httpClient: HttpClient) { 
    if (window.location.href.substr(0, 16) === 'http://localhost') {
      this.host = 'http://localhost:3000'; 
    }
  }

  
  host = ''; 

  // Must set responseType to text or Angular tries to parse non-existent JSON and throws an error... 
  signup(userInfo) {
    return this.httpClient.post(`${this.host}/api/users/register`, userInfo, {observe: 'response', responseType: 'text'});
  }

  login(userInfo) {
    return this.httpClient.post(`${this.host}/api/users/login`, userInfo, {observe: 'response', responseType: 'text'})
  }

  logout() {
    return this.httpClient.delete(`${this.host}/api/users/logout`, {headers: new HttpHeaders().set('musicoll-auth', localStorage.getItem('musicollAuth')), responseType: 'text'})
  }

  loggedIn() {
    return tokenNotExpired('musicollAuth');
  }
}
  