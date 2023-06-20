import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return checkToken();
};

function checkToken(): boolean {
  const router = inject(Router);
  try {
    const token = localStorage.getItem('user_token');
    if (!token)  {
      router.navigate(['/','auth']);
    }
    return token?true:false;
  } catch (e) {
    alert('Algo salió mal, vuelva a intentarlo más tarde.');
    console.error('Algo salió mal, vuelva a intentarlo más tarde.', e);
    return false;
  }
}
