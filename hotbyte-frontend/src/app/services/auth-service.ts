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
  saveUser(res: any) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('name', res.name);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getAllMenu() {
    return this.http.get(`${this.baseUrl}/user/menu`);
  }
  addToCart(id:number) {
    return this.http.post(`${this.baseUrl}/user/cart/${id}`, {});
  }
  getCart() {
    return this.http.get(`${this.baseUrl}/user/cart`);
  }
  removeFromCart(id:number) {
    return this.http.delete(`${this.baseUrl}/user/cart/${id}`);
  }
  addMenu(data:any) {
    return this.http.post(`${this.baseUrl}/restaurant/menu`, data);
  }
  getRestaurantMenu() {
    return this.http.get(`${this.baseUrl}/restaurant/menu`);
  }
  deleteMenu(id:number) {
    return this.http.delete(`${this.baseUrl}/restaurant/menu/${id}`);
  }
}

