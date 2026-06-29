import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  isDarkMode: WritableSignal<boolean> = signal(false) 

  private _PLATFORM_ID = inject(PLATFORM_ID)
  constructor() { 

   if(isPlatformBrowser(this._PLATFORM_ID)){
     const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
   }
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
   toggleTheme() {
    if (this.isDarkMode()) {
      this.disableDarkMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.isDarkMode.set(true);
  }

  private disableDarkMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    this.isDarkMode.set(false);
  }
}
