import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5489/api/user';

  // ✅ Reactive store (shared across app)
  private profileSubject = new BehaviorSubject<any>(null);

  // ✅ Public observable
  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ Fetch profile & broadcast
  getProfile(): void {
    this.http.get(`${this.baseUrl}/profile`)
      .subscribe({
        next: (data) => {
          this.profileSubject.next(data);  // ✅ notify all subscribers
        },
        error: (err) => {
          console.error('Error fetching profile', err);
        }
      });
  }
}