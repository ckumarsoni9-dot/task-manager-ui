import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login')
      .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register')
      .then(m => m.Register)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard')
      .then(m => m.Dashboard),
    canActivate: [() => {
      const auth = inject(AuthService);
      const router = inject(Router);
      const token = auth.getToken();
       console.log('Guard check - Token:', token);
      if (!token) {
         router.navigateByUrl('/login');
        return false;
      }
      return true;
    }]
  },
  { path: '**', redirectTo: 'dashboard' }
];
