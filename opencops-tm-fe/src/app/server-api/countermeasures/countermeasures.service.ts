import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountermeasuresService {

  serverUrl = environment.apiUrl + "countermeasures/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Countermeasures() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  Details(countermeasureid) {
    return this.http.get<any>(`${this.serverUrl}details/` + countermeasureid);
  }

  CountermeasuresById(countermeasureid) {
    return this.http.get<any>(`${this.serverUrl}countermasuresbyid/` + countermeasureid);
  }

  ListCountermeasuresByWeaknessId(weaknessid) {
    return this.http.get<any>(`${this.serverUrl}listcountermeasuresbyweaknessid/` + weaknessid);
  }

  AddCountermeasure(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

}
