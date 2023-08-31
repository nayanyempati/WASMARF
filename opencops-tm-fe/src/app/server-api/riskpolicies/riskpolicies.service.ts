import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskpoliciesService {
  serverUrl = environment.apiUrl + "riskpolicies/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  List() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }


  Create(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  Details(riskpolicyid) {
    return this.http.get<any>(`${this.serverUrl}details/` + riskpolicyid);
  }
}
