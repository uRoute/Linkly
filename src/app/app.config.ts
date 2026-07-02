import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    provideToastr(),
    importProvidersFrom(CookieService),
    provideClientHydration(withEventReplay())
  ]
};
