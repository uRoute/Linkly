import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _Router = inject(Router)
  private _PLATFORM_ID = inject(PLATFORM_ID)
  private _CookieService = inject(CookieService);
  private _AuthenticationService = inject(AuthenticationService)
  private _ToastrService = inject(ToastrService)
  isSpinner:boolean = false
  resMessage:string = '';

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required,Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)])
  })

  Login(){
    if(this.loginForm.valid){
      this.isSpinner=true;
      this._AuthenticationService.SignIn(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.info('Hello',res.data.user.name)
          this.isSpinner=false;
          this._Router.navigate(['/home'])
          if(isPlatformBrowser(this._PLATFORM_ID)){
            this._CookieService.set('userToken', res.data.token);
            this._AuthenticationService.decodeToken(res.data.token)
            isPlatformBrowser(this._PLATFORM_ID)?localStorage.setItem('userDetails' , JSON.stringify(res.data.user)):''
          }
        },
        error:(err)=>{
          console.log(err);
          
          this.isSpinner=false;
          this.resMessage=err.error.message;
          this._ToastrService.error(this.resMessage)
        }
      })
    }else{
      console.log(this.loginForm);
      
    }
  }


}
