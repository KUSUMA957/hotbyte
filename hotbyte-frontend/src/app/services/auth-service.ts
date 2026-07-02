import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5489/api';
  constructor(private http: HttpClient, private router: Router) {}
  register(data:any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }
  login(data:any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}

