import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { ILogedUser } from '../../../core/interfaces/loggedUser/iloged-user';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../../core/interfaces/userDetails/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
  ) {}

  userInfo: WritableSignal<ILogedUser> = signal({} as ILogedUser);
  decodeToken(token: string) {
    this.userInfo.update((old) => (old = jwtDecode(token)));
  }

  SignUp(userForm: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/users/signup`,
      userForm,
    );
  }
  SignIn(userForm: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseURL}/users/signin`,
      userForm,
    );
  }
  ChangePassword(userForm: object): Observable<any> {
    return this._HttpClient.patch(
      `${environment.baseURL}/users/change-password`,
      userForm,
    );
  }
}
