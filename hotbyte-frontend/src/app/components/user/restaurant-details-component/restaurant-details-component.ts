import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-restaurant-details-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-details-component.html',
  styleUrl: './restaurant-details-component.css',
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantId!: number;
  restaurantName = '';
  location = '';
  rating = 0;
  deliveryTime = 0;
  categoriesList: string[] = ['All'];
  selectedCategory = 'All';
  allItems: any[] = [];
  groupedItems: { [key: string]: any[] } = {};

  searchText = '';

  // ✅ Floating category toggle
  showCategories = false;
  
cartItems: any[] = [];
cartMap: Map<number, any> = new Map();

cartCount = 0;
cartTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {

    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    // ✅ Random delivery time
    this.deliveryTime = Math.floor(Math.random() * 20) + 20;

    this.loadMenu();
    this.loadCart();
  }

  loadMenu() {
    this.http.get<any[]>('http://localhost:5489/api/user/menu')
      .subscribe(res => {

        const items = res.filter(i => i.restaurantId === this.restaurantId);

        this.allItems = items;

        if (items.length) {
          this.restaurantName = items[0].restaurantName;
          this.location = items[0].location;

          // ✅ ✅ AVG RATING FIX
          this.rating = Number(
            (items.reduce((sum, item) => sum + item.rating, 0) / items.length).toFixed(1)
          );
        }

        this.groupByCategory(items);
        
      this.cdr.detectChanges(); 

      });
  }

  groupByCategory(items: any[]) {
    this.groupedItems = {};

    items.forEach(item => {
      if (!this.groupedItems[item.category]) {
        this.groupedItems[item.category] = [];
      }
      this.groupedItems[item.category].push(item);
      
      this.cdr.detectChanges(); 

    });
  }

  // ✅ SEARCH FILTER
  get filteredItems() {
    if (!this.searchText) return this.groupedItems;

    const result: any = {};

    for (let category in this.groupedItems) {
      const filtered = this.groupedItems[category].filter(item =>
        item.itemName.toLowerCase().includes(this.searchText.toLowerCase())
      );

      if (filtered.length) {
        result[category] = filtered;
      }
    }

    return result;
  }

  // ✅ ✅ SCROLL FIX (CATEGORY BASED)
  scrollToCategory(category: string) {
    const element = document.getElementById(category);
    element?.scrollIntoView({ behavior: 'smooth' });

    // ✅ close popup after click
    this.showCategories = false;
    
      this.cdr.detectChanges(); 

  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
    
      this.cdr.detectChanges(); 

  }

  back() {
    this.router.navigate(['/dashboard']);
  }



// ✅ INCREASE QTY
increase(item: any) {

  const cartItem = this.cartMap.get(item.id);

  this.http.put(
    `http://localhost:5489/api/user/cart/${cartItem.id}?quantity=${cartItem.quantity + 1}`,
    {},
    { responseType: 'text' as 'json' }
  ).subscribe(() => {

    this.loadCart(); 

  });
}



// ✅ DECREASE QTY
decrease(item: any) {

  const cartItem = this.cartMap.get(item.id);

  if (cartItem.quantity === 1) {

    this.http.delete(
      `http://localhost:5489/api/user/cart/${cartItem.id}`,
      { responseType: 'text' as 'json' }
    ).subscribe(() => {

      this.loadCart(); 

    });

  } else {

    this.http.put(
      `http://localhost:5489/api/user/cart/${cartItem.id}?quantity=${cartItem.quantity - 1}`,
      {},
      { responseType: 'text' as 'json' }
    ).subscribe(() => {

      this.loadCart(); 

    });
  }
}



// ✅ CART BAR ALWAYS FROM BACKEND
updateCartBar() {
  let count = 0;
  let total = 0;

  this.cartItems.forEach(c => {
    count += c.quantity;
    total += c.quantity * c.menu.price;
  });

  this.cartCount = count;
  this.cartTotal = total;
  this.cdr.detectChanges(); 
}




getCategoryImage(category: string): string {

  const normalized = category.toLowerCase();

  const map: any = {
    'starter': 'starter.png',
    'starters': 'starter.png',
    'dessert': 'desserts.png',
    'desserts': 'desserts.png'
  };

  const fileName = map[normalized] || normalized.replace(/\s+/g, '-') + '.png';

  return '/assets/categories/' + fileName;
}


// ✅ ADD TO CART (WITH RESTAURANT CHECK)
addToCart(item: any) {

  // ✅ CASE 1: EMPTY CART
  if (!this.cartItems || this.cartItems.length === 0) {
    this.addItemToBackend(item.id);
    return;
  }

  // ✅ GET EXISTING RESTAURANT ID (from backend DTO)
  const existingRestaurantId = this.cartItems[0].menu.restaurantId;

  // ✅ COMPARE
  if (existingRestaurantId === item.restaurantId) {

    // ✅ SAME → ADD
    this.addItemToBackend(item.id);

  } else {

    // ✅ DIFFERENT → CONFIRM
    const confirmReplace = confirm(
      "Your cart contains items from another restaurant.\nDo you want to replace it?"
    );

    if (!confirmReplace) return;

    // ✅ CLEAR CART
    const deleteCalls = this.cartItems.map(c =>
      this.http.delete(
        `http://localhost:5489/api/user/cart/${c.id}`,
        { responseType: 'text' as 'json' }
      ).toPromise()
    );

    Promise.all(deleteCalls).then(() => {

      this.cartItems = [];
      this.cartMap.clear();

      this.addItemToBackend(item.id);
    });
  }
}




// ✅ ADD ITEM → BACKEND + RELOAD
addItemToBackend(menuId: number) {
  this.http.post(
    `http://localhost:5489/api/user/cart/${menuId}`,
    {},
    { responseType: 'text' as 'json' }
  ).subscribe(() => {

    this.loadCart();  

  });
}




openCart() {
  this.router.navigate(['/cart']);
}



// ✅ LOAD CART FROM BACKEND
loadCart() {
  this.http.get<any[]>('http://localhost:5489/api/user/cart')
    .subscribe(res => {

      this.cartItems = res;
      this.cartMap.clear();

      res.forEach(c => {
        this.cartMap.set(c.menu.id, c); // menuId → cart item
      });

      this.syncQtyWithUI();
      this.updateCartBar();
    });
}






// ✅ SYNC CART → UI ITEMS
syncQtyWithUI() {
  this.allItems.forEach(item => {

    const cartItem = this.cartMap.get(item.id);

    if (cartItem) {
      item.qty = cartItem.quantity;  // show qty
    } else {
      delete item.qty; // show ADD button
    }

  });

  this.updateCartBar();
}


}