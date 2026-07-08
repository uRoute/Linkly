import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [NavbarComponent, RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
