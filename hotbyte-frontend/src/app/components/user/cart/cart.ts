import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  
standalone: true,
  imports: [CommonModule],

  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart 
implements OnInit {

  cartItems: any[] = [];
  baseUrl = 'http://localhost:5489/api/user/cart';
  
orderUrl = 'http://localhost:5489/api/user/orders/place';

  totalAmount: number = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCart();
  }

  // ✅ LOAD CART
  loadCart() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (res) => {
        this.cartItems = res;
        this.calculateTotal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading cart', err);
      }
    });
  }

  // ✅ ADD ITEM
  addToCart(menuId: number) {
    this.http.post(
      `${this.baseUrl}/${menuId}`,
      {},
      { responseType: 'text' as 'json' }
    ).subscribe(() => {
      this.loadCart(); // ✅ refresh
    });
  }

  // ✅ INCREASE QTY
  increaseQty(item: any) {
    this.updateQty(item, item.quantity + 1);
  }

  // ✅ DECREASE QTY
  decreaseQty(item: any) {

    if (item.quantity <= 1) {
      this.removeItem(item.id);
      return;
    }

    this.updateQty(item, item.quantity - 1);
  }

  // ✅ UPDATE QTY (PUT)
  updateQty(item: any, qty: number) {
    this.http.put(
      `${this.baseUrl}/${item.id}?quantity=${qty}`,
      {},
      { responseType: 'text' as 'json' }
    ).subscribe(() => {
      this.loadCart();
    });
  }

  // ✅ REMOVE
  removeItem(cartId: number) {
    this.http.delete(
      `${this.baseUrl}/${cartId}`,
      { responseType: 'text' as 'json' }
    ).subscribe(() => {
      this.loadCart();
    });
  }

  // ✅ TOTAL
  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => {
      return sum + (item.menu.price * item.quantity);
    }, 0);
  }
 
  
placeOrder() {

  // ✅ prevent empty order
  if (this.cartItems.length === 0) {
    alert("⚠️ Cart is empty");
    return;
  }

  // ✅ STEP 1: Call backend (this does EVERYTHING)
  this.http.post<any>(this.orderUrl, {})
    .subscribe({

      next: (res) => {

        console.log("Order Response:", res);

        // ✅ STEP 2: Show proper order details
        alert(`✅ Order Placed Successfully!

🆔 Order ID: ${res.id}
💰 Total: ₹${res.totalAmount}

📍 Address: ${res.address?.addressLine || 'Not available'}

📦 Items: ${res.items.length}
🕒 Status: ${res.status}
`);

        // ✅ STEP 3: CLEAR UI (backend already cleared DB)
        this.cartItems = [];
        this.totalAmount = 0;

        // ✅ STEP 4: Reload cart (should now be empty)
        this.loadCart();

      },

      error: (err) => {
        console.error('Error placing order', err);
        alert("❌ Failed to place order");
      }
    });
}

}

