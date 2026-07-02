import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  let _PLATFORM_ID = inject(PLATFORM_ID)
  let _CookieService = inject(CookieService);

  let _Router = inject(Router)
  if(isPlatformBrowser(_PLATFORM_ID)){
    if(_CookieService.check('userToken')){
      return true;
    }else{
      _Router.navigate(['/login'])
      return false
    }
  }



  return true;
};
