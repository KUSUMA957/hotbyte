import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // ✅ Check if token exists
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // ✅ Get allowed roles from route
  const allowedRoles = route.data['roles'];

  // ✅ Check role authorization
  if (allowedRoles && !allowedRoles.includes(role)) {

    // 🔁 Redirect user to correct dashboard
    if (role === 'USER') {
      router.navigate(['/dashboard']);
    } else if (role === 'RESTAURANT') {
      router.navigate(['/restaurant']);
    } else if (role === 'ADMIN') {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/login']); // fallback
    }

    return false;
  }

  return true;
};
