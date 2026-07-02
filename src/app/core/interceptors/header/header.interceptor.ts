import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let _PLATFORM_ID = inject(PLATFORM_ID);
  let _CookieService = inject(CookieService);

  if (_CookieService.check('userToken')) {
    req = req.clone({
      setHeaders: { Token: _CookieService.get('userToken') },
    });
    return next(req);
  }

  return next(req);
};
