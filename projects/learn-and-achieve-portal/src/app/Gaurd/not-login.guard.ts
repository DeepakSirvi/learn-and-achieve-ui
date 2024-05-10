import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Service/login.service';

export const NotLoginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
   if(!loginService.isLoggedIn())
   {
    router.navigate(['']);
    return false;
   }
  return true;
};
