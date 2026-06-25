import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  
  baseUrl = 'http://localhost:5489/api/restaurant';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/menu`);
  }

  addMenu(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/menu`, data);
  }

  updateMenu(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/menu/${id}`, data);
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/menu/${id}`);
  }
  updateProfile(data: any) {
  return this.http.put(`${this.baseUrl}/profile`, data);
}

}

