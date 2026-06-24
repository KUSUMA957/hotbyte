import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login-component/login-component';
import { RegisterComponent } from './components/auth/register-component/register-component';
import { UserDashboard } from './components/user/user-dashboard/user-dashboard';
import { RestaurantDashboard } from './components/restaurant/restaurant-dashboard/restaurant-dashboard';
import { MenuList } from './components/user/menu-list/menu-list';
import { CartComponent } from './components/user/cart-component/cart-component';
import { AddMenuComponent } from './components/restaurant/add-menu-component/add-menu-component';
import { authGuard } from './guards/auth-guard';
import { AdminComponent } from '../app/components/admin-component/admin-component'
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: UserDashboard, canActivate: [authGuard], data: {roles:['USER']} },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: {roles:['ADMIN']} },
  { path: 'restaurant', component: RestaurantDashboard, canActivate: [authGuard], data: {roles:['RESTAURANT']} },
  { path: 'menu', component: MenuList },
  { path: 'cart', component: CartComponent },
  { path: 'restaurant/add-menu', component: AddMenuComponent }
];