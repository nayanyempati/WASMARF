import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {

  serverUrl = environment.apiUrl + "phases/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Phases() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }


  CreatePhase(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  PhaseDetails(phaseid) {
    return this.http.get<any>(`${this.serverUrl}details/` + phaseid);
  }

}
