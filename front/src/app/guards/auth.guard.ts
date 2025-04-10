import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  try {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (e) {
    localStorage.removeItem('token');
    router.navigate(['/login']);
    return false;
  }
};
