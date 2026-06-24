import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service'
@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }

}
