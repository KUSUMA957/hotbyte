import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboard implements OnInit {

  userName: string = '';
  address: string = '';
  searchText: string = '';

  constructor(
    private userService: UserService,
    private router: Router
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
  }

  // ✅ Navigate to profile page
  openProfile() {
    this.router.navigate(['/profile']);
  }
}