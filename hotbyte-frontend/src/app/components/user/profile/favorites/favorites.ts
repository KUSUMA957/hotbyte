import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {

  favoriteRestaurants: any[] = [];
  baseUrl = 'http://localhost:5489/api/user/favorite';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  // ✅ Load favorites

loadFavorites() {
  this.http.get<any[]>(this.baseUrl).subscribe({
    next: (res) => {

      // ✅ REMOVE DUPLICATES USING restaurant.id
      this.favoriteRestaurants = res.filter(
        (value, index, self) =>
          index === self.findIndex(
            v => v.restaurant.id === value.restaurant.id   // ✅ FIX HERE
          )
      );

      this.cdr.detectChanges();
    },

    error: (err) => {
      console.error('Error fetching favorites', err);
    }
  });
}



  // ✅ Remove from favorites
  removeFavorite(id: number) {
    this.http.delete(`${this.baseUrl}/${id}`).subscribe({
      next: () => {
        console.log("Removed ✅");
        this.loadFavorites(); // refresh
      },
      error: (err) => {
        console.error('Error removing favorite', err);
      }
    });
  }
}

