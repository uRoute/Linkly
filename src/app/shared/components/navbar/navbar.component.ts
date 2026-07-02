import { AfterViewInit, Component, ElementRef, inject, input, InputSignal, PLATFORM_ID, signal, ViewChild, WritableSignal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { GlobalService } from '../../services/global/global.service';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  @ViewChild('nav') navElement!:ElementRef<HTMLElement>
  @ViewChild('dark') inputDarkElement!:ElementRef
  private _PLATFORM_ID = inject(PLATFORM_ID)
  private _Router = inject(Router)
  private _CookieService = inject(CookieService);
  private _GlobalService = inject(GlobalService)
  isUserLogged:InputSignal<boolean> = input(false)

  check(){
    // console.log('clicked');
    // console.log(this.inputDarkElement.nativeElement);
    // console.log(this.inputDarkElement.nativeElement.checked);
    if(this.inputDarkElement.nativeElement.checked){
      this._GlobalService.isDarkMode.set(true)
      this._GlobalService.toggleTheme()
      // console.log(this._GlobalService.isDarkMode());
    }else{
      this._GlobalService.isDarkMode.set(false);
      this._GlobalService.toggleTheme()
      // console.log(this._GlobalService.isDarkMode());
    }
    
  }
  ngAfterViewInit(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let _theme = localStorage.getItem('theme')
      if(_theme === 'light'){
        this.inputDarkElement.nativeElement.checked = true
      }else{
        this.inputDarkElement.nativeElement.checked = false
      }
    }

  }
  LogOut(){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._CookieService.delete('userToken');
      this._Router.navigate(['/login']);
    }
  }

}
