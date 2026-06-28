import { Component } from '@angular/core';
import { UserInfo } from '../user-info/user-info'
import { CommonModule } from '@angular/common';
import { AddressList } from '../address-list/address-list';
import { Favorites } from '../favorites/favorites';
import { Orders } from '../orders/orders';
import { Cart } from '../cart/cart';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [UserInfo, CommonModule, AddressList, Favorites, Orders, Cart],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class UserProfileComponent {
  
  constructor(private router: Router) {}

  // ✅ LOGOUT FUNCTION
  logout() {

    // ✅ remove token
    localStorage.removeItem('token');
    localStorage.clear();
    // ✅ redirect to login
    this.router.navigate(['/login']);

  }
}
