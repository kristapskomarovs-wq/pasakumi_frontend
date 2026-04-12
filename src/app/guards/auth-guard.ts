import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../services/user-data';

export const authGuard: CanActivateFn = () => {
  const userDataService = inject(UserDataService);
  const router = inject(Router);

  if (userDataService.isLoggedIn()) {
    return true;   // Laist cauri
  }
  return router.createUrlTree(['/']);  // Novirzīt uz login
};