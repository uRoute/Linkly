import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _Router = inject(Router)
  private _AuthenticationService = inject(AuthenticationService)
  private _ToastrService = inject(ToastrService)
  isSpinner:boolean = false

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
          this._ToastrService.info('Hello')
        }
      })
    }
  }


}
