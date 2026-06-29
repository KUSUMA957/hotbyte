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
  cartCount = 0;
cartTotal = 0;

addItem(item: any) {
  item.qty = 1;
  this.updateCart();
  
      this.cdr.detectChanges(); 

}

increase(item: any) {
  item.qty++;
  this.updateCart();
  
      this.cdr.detectChanges(); 

}

decrease(item: any) {
  item.qty--;
  if (item.qty === 0) delete item.qty;
  this.updateCart();
  
      this.cdr.detectChanges(); 

}

updateCart() {
  let count = 0;
  let total = 0;

  this.allItems.forEach(i => {
    if (i.qty) {
      count += i.qty;
      total += i.qty * i.price;
    }
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


}