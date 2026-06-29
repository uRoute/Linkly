import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _HttpClient:HttpClient) { }
  SignUp(userForm:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/users/signup`,userForm)
  }
  SignIn(userForm:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/users/signin`,userForm)
  }
  ChangePassword(userForm:object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURL}/users/change-password`,userForm)
  }

}
