import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-rated-dishes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-rated-dishes.html',
  styleUrl: './top-rated-dishes.css',
})
export class TopRatedDishes implements OnInit {

  restaurants: any[] = [];

  baseUrl = 'http://localhost:5489/api/user/menu';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTopRated();
  }

 loadTopRated() {
  this.http.get<any[]>(this.baseUrl).subscribe({
    next: (res) => {

      // ✅ Step 1: filter
      const topRated = (res || []).filter(item => item.rating >= 4);

      // ✅ Step 2: group by restaurant
      const map = new Map<number, any[]>();

      topRated.forEach(item => {

        if (!map.has(item.restaurantId)) {
          map.set(item.restaurantId, []);
        }

        map.get(item.restaurantId)?.push(item);
      });

      // ✅ Step 3: pick top 2 per restaurant
      const result: any[] = [];

      map.forEach((items) => {

        const topTwo = items
          .sort((a, b) => b.rating - a.rating)  // ✅ sort high → low
          .slice(0, 2);                         // ✅ top 2

        result.push(...topTwo);                 // ✅ flatten
      });

      // ✅ Step 4: Optional limit (for UI clean)
      this.restaurants = result.slice(0, 8);

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
}

  // ✅ Navigate
  openRestaurant(id: number) {
    this.router.navigate(['/restaurant', id]);
  }
}

