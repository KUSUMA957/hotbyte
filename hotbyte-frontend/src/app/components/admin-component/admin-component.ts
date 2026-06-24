import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-admin-component',
  imports: [],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent {
constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }

}
