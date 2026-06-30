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

      // ✅ STEP 1: filter rating >= 4.5
      const highRated = (res || [])
        .filter(item => Number(item.rating) >= 4.5)
        .sort((a, b) => Number(b.rating) - Number(a.rating)); // ✅ STEP 2: global sort

      const restaurantCount = new Map<number, number>();
      const result: any[] = [];

      // ✅ STEP 3 + 4: max 2 per restaurant + limit 10
      for (let item of highRated) {

        const count = restaurantCount.get(item.restaurantId) || 0;

        if (count < 2) {
          result.push(item);
          restaurantCount.set(item.restaurantId, count + 1);
        }

        if (result.length >= 10) break; // ✅ max 10
      }

      this.restaurants = result;

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