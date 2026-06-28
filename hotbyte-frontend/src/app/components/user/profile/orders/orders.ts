import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class Orders implements OnInit {

  orders: any[] = [];
  baseUrl = 'http://localhost:5489/api/user/orders';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef   // ✅ ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (res) => {
        console.log("Orders:", res);

        this.orders = [...(res || [])];  // ✅ NEW REFERENCE

        this.cdr.detectChanges();        // ✅ FORCE UI UPDATE
      },
      error: (err) => {
        console.error('Error fetching orders', err);
      }
    });
  }
}