import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  console.log(token)


  if (token) {
    return true; // usuário logado
  } else {
    router.navigate(['']);
    return false;
  }
};
