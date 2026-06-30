import { Routes } from '@angular/router';

import { LoginComponent } from './components/auth/login-component/login-component';
import { RegisterComponent } from './components/auth/register-component/register-component';

import { UserDashboard } from './components/user/user-dashboard/user-dashboard';
import { RestaurantDashboard } from './components/restaurant/restaurant-dashboard/restaurant-dashboard';
import { RestaurantDetailsComponent } from './components/user/restaurant-details-component/restaurant-details-component';
import { UserProfileComponent } from './components/user/profile/profile/profile';
import { Cart } from './components/user/cart/cart';

import { Company } from './components/user/pages/company/company';
import { Contact } from './components/user/pages/contact/contact';
import { Legal } from './components/user/pages/legal/legal';

import { AdminComponent } from './components/admin-component/admin-component';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // ✅ AUTH
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ✅ USER ROUTES (PROTECTED)
  {
    path: 'dashboard',
    component: UserDashboard,
    canActivate: [authGuard],
    data: { roles: ['USER'] }
  },

  {
    path: 'restaurant/:id',
    component: RestaurantDetailsComponent,
    canActivate: [authGuard],
    data: { roles: ['USER'] }
  },

  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
    data: { roles: ['USER'] }
  },

  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [authGuard],
    data: { roles: ['USER'] }
  },

  // ✅ RESTAURANT DASHBOARD
  {
    path: 'restaurant',
    component: RestaurantDashboard,
    canActivate: [authGuard],
    data: { roles: ['RESTAURANT'] }
  },

  // ✅ ADMIN
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },

  // ✅ PUBLIC ROUTES (OPTIONAL → YOU DECIDE)
  // 👉 If you want them PUBLIC, keep like this
  // { path: 'company', component: Company },
  // { path: 'contact', component: Contact },
  // { path: 'legal', component: Legal },

  // ✅ OPTIONAL: protect public pages also (if needed)
  // Uncomment if required 👇
  
  {
    path: 'company',
    component: Company,
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    component: Contact,
    canActivate: [authGuard]
  },
  {
    path: 'legal',
    component: Legal,
    canActivate: [authGuard]
  },
  

  // ✅ FALLBACK
  { path: '**', redirectTo: 'login' }

];
