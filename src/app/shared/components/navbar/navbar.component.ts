import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { GlobalService } from '../../services/global/global.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {

  private _PLATFORM_ID = inject(PLATFORM_ID)
  private _GlobalService = inject(GlobalService)

  @ViewChild('dark') inputDarkElement!:ElementRef

  check(){
    // console.log('clicked');
    // console.log(this.inputDarkElement.nativeElement);
    // console.log(this.inputDarkElement.nativeElement.checked);
    if(this.inputDarkElement.nativeElement.checked){
      this._GlobalService.isDarkMode.set(true)
      this._GlobalService.toggleTheme()
      console.log(this._GlobalService.isDarkMode());
    }else{
      this._GlobalService.isDarkMode.set(false);
      this._GlobalService.toggleTheme()
      console.log(this._GlobalService.isDarkMode());
    }
    
  }


  ngAfterViewInit(){

    if(isPlatformBrowser(this._PLATFORM_ID)){
      let _theme = localStorage.getItem('theme')
      if(_theme === 'light'){
        this.inputDarkElement.nativeElement.checked = true
      }
    }

  }

}
