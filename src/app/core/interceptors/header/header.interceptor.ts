import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (!req.url.includes('login') || !req.url.includes('register')) {
      req = req.clone({
        setHeaders: { Token: localStorage.getItem('userToken')! },
      });
    }

    return next(req);
  }

  return next(req);
};
