import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  
import { TopRatedDishes} from '../top-rated-dishes/top-rated-dishes';
import { CategoryScrollComponent } from '../category-scroll-component/category-scroll-component'
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TopRatedDishes, CategoryScrollComponent],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit {

  userName: string = '';
  address: string = '';
  searchText: string = '';
  categoriesList: string[] = [];
selectedCategory = 'All';
filteredRestaurants: any[] = [];
allItems: any[] = [];
filteredItems: any[] = [];
allRestaurants: any[] = [];
displayedRestaurants: any[] = [];
sortOption = 'default';

defaultImage =
  'https://i.pinimg.com/originals/1f/61/15/1f6115deda19c4c5ae2200ff54b82fae.jpg';

// ✅ FAVORITES STATE
favorites: Set<number> = new Set();
favoriteMap: Map<number, number[]> = new Map();

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {

    // ✅ Subscribe to profile updates (reactive)
    this.userService.profile$.subscribe({
      next: (res: any) => {
        if (res) {
          this.userName = res.name;
          this.address = res.address;
        }
      },
      error: (err) => {
        console.error('Profile subscription error', err);
      }
    });

    // ✅ Initial API call
    this.userService.getProfile();
    this.loadMenu();
    this.loadFavorites();
  }

  // ✅ Navigate to profile page
  openProfile() {
    this.router.navigate(['/profile']);
  }


  // ✅ LOAD MENU DATA
  loadMenu(): void {

    this.http.get<any[]>('http://localhost:5489/api/user/menu')
      .subscribe((res: any[]) => {        // ✅ FIX 2

        this.allItems = res;

        // ✅ FIX 3 + 4 (TYPE SAFE)
        const uniqueCategories = new Set<string>();

        res.forEach((i: any) => {         // ✅ FIX 4
          uniqueCategories.add(i.category);
        });

        this.categoriesList = [
          'All',
          ...Array.from(uniqueCategories)
        ];

        this.applyFilter();
        const map = new Map<number, any>();

this.allItems.forEach(item => {
  if (!map.has(item.restaurantId)) {
    map.set(item.restaurantId, {
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      rating: item.rating,
      location: item.location,
      price: item.price,
      deliveryTime: Math.floor(Math.random() * 20) + 20
    });
  }
});

this.allRestaurants = Array.from(map.values());
this.displayedRestaurants = [...this.allRestaurants];

        this.cdr.detectChanges();
      });
  }

  // ✅ CATEGORY CLICK
  // selectCategory(category: string): void {
  //   this.selectedCategory = category;
  //   this.applyFilter();
  // }
  selectCategory(category: string): void {

  // ✅ Toggle behavior (hide if clicked again)
  if (this.selectedCategory === category) {
    this.selectedCategory = '';
    this.filteredRestaurants = [];
     this.cdr.detectChanges(); 
    return;
  }

  this.selectedCategory = category;

  const filtered = category === 'All'
    ? this.allItems
    : this.allItems.filter(i => i.category === category);

  // ✅ GROUP BY restaurant
  const map = new Map<number, any>();

  filtered.forEach(item => {
    if (!map.has(item.restaurantId)) {
      map.set(item.restaurantId, {
        restaurantId: item.restaurantId,
        restaurantName: item.restaurantName,
        rating: item.rating,
        category: item.category
      });
    }
  });

  this.filteredRestaurants = Array.from(map.values()).map((res: any) => ({
    ...res,
    deliveryTime: Math.floor(Math.random() * 20) + 20
  }));
   this.cdr.detectChanges(); 
}

  // ✅ FILTER LOGIC
  applyFilter(): void {

    if (this.selectedCategory === 'All') {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.allItems.filter((item: any) =>
        item.category === this.selectedCategory
      );
    }
  }
  getCategoryImage(category: string): string {

  const normalized = (category || 'all').toLowerCase();

  const map: any = {
    'starter': 'starter.png',
    'starters': 'starter.png',
    'dessert': 'desserts.png',
    'desserts': 'desserts.png',
    'all': 'all.png'
  };

  const fileName =
    map[normalized] || normalized.replace(/\s+/g, '-') + '.png';

  const path = '/assets/categories/' + fileName;

  // ✅ fallback image
  const fallback =
    'https://i.pinimg.com/originals/1f/61/15/1f6115deda19c4c5ae2200ff54b82fae.jpg';

  /*
   IMPORTANT:
   background-image doesn't trigger error
   so we simulate fallback
  */
  return path || fallback;
}

setDefaultImage(event: any) {
  event.target.src = this.defaultImage;
}

openRestaurant(id: number) {
  this.router.navigate(['/restaurant', id]);
}
sortRestaurants(option: string) {
  this.sortOption = option;

  switch(option) {

    case 'rating':
      this.displayedRestaurants.sort((a, b) => b.rating - a.rating);
      break;

    case 'delivery':
      this.displayedRestaurants.sort((a, b) => a.deliveryTime - b.deliveryTime);
      break;

    case 'lowToHigh':
      this.displayedRestaurants.sort((a, b) => a.price - b.price);
      break;

    case 'highToLow':
      this.displayedRestaurants.sort((a, b) => b.price - a.price);
      break;

    default:
      this.displayedRestaurants = [...this.allRestaurants];
  }
}



// ✅ LOAD FAVORITES (SOURCE OF TRUTH)
loadFavorites() {
  this.http.get<any[]>('http://localhost:5489/api/user/favorite')
    .subscribe((res: any[]) => {

      this.favorites.clear();
      this.favoriteMap.clear();

      res.forEach(fav => {

        const restaurantId = fav.restaurant.id; // ✅ FIX

        this.favorites.add(restaurantId);

        if (!this.favoriteMap.has(restaurantId)) {
          this.favoriteMap.set(restaurantId, []);
        }

        this.favoriteMap.get(restaurantId)!.push(fav.id);
      });

      this.cdr.detectChanges();
    });
}
toggleFavorite(event: Event, restaurant: any) {

  event.stopPropagation();

  const restaurantId = restaurant.restaurantId;

  if (restaurant.loading) return;
  restaurant.loading = true;

  if (this.favorites.has(restaurantId)) {

    // ✅ REMOVE ALL
    const ids = this.favoriteMap.get(restaurantId) || [];

    const deleteCalls = ids.map(id =>
      this.http.delete(
        `http://localhost:5489/api/user/favorite/${id}`,
        { responseType: 'text' as 'json' }
      ).toPromise()
    );

    Promise.all(deleteCalls).then(() => {

      this.loadFavorites();   // ✅ refresh from DB
      restaurant.loading = false;

    });

  } else {

    // ✅ ADD
    this.http.post(
      `http://localhost:5489/api/user/favorite/${restaurantId}`,
      {},
      { responseType: 'text' as 'json' }
    ).subscribe(() => {

      this.loadFavorites();   // ✅ refresh from DB
      restaurant.loading = false;

    });
  }
}

applySearch() {

  const text = this.searchText.toLowerCase().trim();

  // ✅ If empty → show all
  if (!text) {
    this.displayedRestaurants = [...this.allRestaurants];
    return;
  }

  this.displayedRestaurants = this.allRestaurants.filter(res => {

    // ✅ 1. Restaurant name match
    const nameMatch =
      res.restaurantName.toLowerCase().includes(text);

    // ✅ 2. Item name OR category match
    const itemMatch = this.allItems.some(item =>
      item.restaurantId === res.restaurantId &&
      (
        item.itemName.toLowerCase().includes(text)   
        ||
        item.category.toLowerCase().includes(text)   
      )
    );

    return nameMatch || itemMatch;
  });

  this.cdr.detectChanges();
}
}