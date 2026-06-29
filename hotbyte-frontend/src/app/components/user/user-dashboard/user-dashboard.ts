import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  
import { TopRatedDishes} from '../top-rated-dishes/top-rated-dishes';
import { CategoryScrollComponent } from '../category-scroll-component/category-scroll-component'
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TopRatedDishes, CategoryScrollComponent],
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
openRestaurant(id: number) {
  this.router.navigate(['/restaurant', id]);
}
}