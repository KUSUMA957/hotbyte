import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;

  baseUrl = 'http://localhost:5489/api/user/cart';
  orderUrl = 'http://localhost:5489/api/user/orders/place';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef   // ✅ ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // ✅ LOAD CART
  loadCart() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (res) => {
        console.log("Cart:", res);

        this.cartItems = [...(res || [])];  // ✅ NEW REFERENCE
        this.calculateTotal();

        this.cdr.detectChanges();           // ✅ FORCE UI UPDATE
      },
      error: (err) => {
        console.error('Error loading cart', err);
      }
    });
  }

  // ✅ CALCULATE TOTAL
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + (item.menu.price * item.quantity);
    }, 0);
  }

  // ✅ REMOVE ITEM
  removeItem(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          console.log("Item removed ✅");

          this.loadCart();   // ✅ RELOAD DATA (UI UPDATES)
        },
        error: (err) => {
          console.error('Error removing item', err);
        }
      });
  }

  // ✅ PLACE ORDER
  placeOrder() {
    this.http.post(this.orderUrl, {})
      .subscribe({
        next: () => {
          console.log("Order placed ✅");

          this.loadCart();   // ✅ CLEAR CART

          alert("Order placed successfully ✅");
        },
        error: (err) => {
          console.error('Error placing order', err);
          alert("Failed to place order ❌");
        }
      });
  }
}