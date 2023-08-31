import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serverUrl = environment.apiUrl + "account/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  //REGISTER
  Register(data: any) {
    return this.http.post<any>(`${this.serverUrl}register/`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  //LOGIN
  Login(data: any) {
    return this.http.post<any>(`${this.serverUrl}login/`, data, { headers: this.headers })
    .pipe(
      map((response: any) => {
        if (response.AccessToken) {
          // Set the authenticated flag to true
          this._authenticated = true;
          // Store the access token in the session storage
          sessionStorage.setItem('AccessToken', response.AccessToken);
          
        }
        // Return a new observable with the response
        return response;
      })
    );
  }

  //FORGOT PASSWORD
  Forgot(data: any) {
    return this.http.post<any>(`${this.serverUrl}forgot/`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  //RESET PASSWORD
  Reset(data: any, token: string) {
    return this.http.post<any>(`${this.serverUrl}reset/` + token, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  //ACTIVATE
  Activate(token: string) {
    return this.http.get<any>(`${this.serverUrl}activate/` + token);
  }

  Token(){
    return this.http.get<any>(`${this.serverUrl}token/`).pipe(
      map((response: any) => {
        if (response.AccessToken) {
          // Set the authenticated flag to true
          this._authenticated = true;
          // Store the access token in the session storage
          sessionStorage.setItem('AccessToken', response.AccessToken);
          
        }
        // Return a new observable with the response
        return response;
      })
    )
  }

}
