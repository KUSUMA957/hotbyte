import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login-component/login-component';
import { RegisterComponent } from './components/auth/register-component/register-component';
import { UserDashboard } from './components/user/user-dashboard/user-dashboard';
import { RestaurantDashboard } from './components/restaurant/restaurant-dashboard/restaurant-dashboard';
import { authGuard } from './guards/auth-guard';
import { AdminComponent } from '../app/components/admin-component/admin-component'
import { UserProfileComponent } from '../app/components/user/profile/profile/profile'
import { RestaurantDetailsComponent } from '../app/components/user/restaurant-details-component/restaurant-details-component';
import { Company } from '../app/components/user/pages/company/company';
import { Contact } from '../app/components/user/pages/contact/contact';
import { Legal } from '../app/components/user/pages/legal/legal';
import { Cart } from '../app/components/user/cart/cart';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: UserDashboard, canActivate: [authGuard], data: {roles:['USER']} },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: {roles:['ADMIN']} },
  { path: 'restaurant', component: RestaurantDashboard, canActivate: [authGuard], data: {roles:['RESTAURANT']} },
  { path: 'profile', component: UserProfileComponent, canActivate: [authGuard], data: { roles: ['USER'] }},
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  { path: 'company', component: Company},
  { path: 'contact', component: Contact },
  { path: 'legal', component: Legal },
  { path: 'cart', component: Cart }
  ];