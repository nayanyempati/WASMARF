import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeaknessService {

  serverUrl = environment.apiUrl + "weakness/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Weakness() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  ListForCountermeasures() {
    return this.http.get<any>(`${this.serverUrl}listforcountermeasures`);
  }

  Details(weaknessid: number) {
    return this.http.get<any>(`${this.serverUrl}details/` + weaknessid);
  }

  CreateWeakness(data:any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
