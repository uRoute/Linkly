import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';

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
  isSpinner:boolean = false

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    username:new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    dateOfBirth : new FormControl(null, [Validators.required]),
    gender:new FormControl(null, [Validators.required , Validators.pattern(/^(?:male|female)$/)]),
    email: new FormControl(null , [Validators.required,Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]),
    rePassword : new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)])
  })

  Register(){
    if(this.registerForm.valid){
      this.isSpinner=true;
      this._AuthenticationService.SignUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.info('Hello')
        }
      })
    }
  }


}
