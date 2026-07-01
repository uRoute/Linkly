import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private _Router = inject(Router)
  private _AuthenticationService = inject(AuthenticationService)
  private _ToastrService = inject(ToastrService)
  private _PLATFORM_ID = inject(PLATFORM_ID)
  spChars = '_';
  resMessage:string = '';
  isSpinner:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern(/^[A-Z][a-z]{2,}(?:\s[A-Z][a-z]{2,}){0,3}$/)]),
    username:new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(15), Validators.pattern(/^[a-z0-9_]{3,30}$/)]),
    dateOfBirth : new FormControl(null, [Validators.required]),
    gender:new FormControl(null, [Validators.required , Validators.pattern(/^(?:male|female)$/)]),
    email: new FormControl(null , [Validators.required,Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]),
    rePassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)])
  }, this.PasswordMatch)


  PasswordMatch(form:AbstractControl){
    const password = form.get('password');
    const rePassword = form.get('rePassword');
    return password && rePassword && password.value === rePassword.value ? null : {missMatch : true}
  }


  Register(){
    if(this.registerForm.valid){
      this.isSpinner=true;
      console.log(this.registerForm);
      
      this._AuthenticationService.SignUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.resMessage = res.message;
          this.isSpinner=false;
          this._ToastrService.success(this.resMessage)
          this._Router.navigate(['/login']);
        },error:(err)=>{
          console.log(err);
          this.resMessage = err.error.message;
          this.isSpinner=false;
          this._ToastrService.error(this.resMessage)
        }

      })
    }
  }


}
