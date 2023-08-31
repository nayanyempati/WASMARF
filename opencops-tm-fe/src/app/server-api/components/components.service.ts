import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  serverUrl = environment.apiUrl + "components/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Components() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  ListComponentWeakness(componentid:any){
    return this.http.get<any>(`${this.serverUrl}listcomponentweakness/`+componentid);
  }

  AddWeakness(componentid:any, weaknessid:any) {
    return this.http.post<any>(`${this.serverUrl}addweakness/`+componentid+"/"+weaknessid, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  DeleteWeakness(componentid:any, id:any){
    return this.http.delete<any>(`${this.serverUrl}deleteweakness/`+componentid+"/"+id);
  }

  CreateComponent(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  UpdateComponentStatus(componentid: number, status: any) {
    return this.http.put<any>(`${this.serverUrl}updatestatus/` + componentid + '/' + status, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  ComponentDetails(component_id: number) {
    return this.http.get<any>(`${this.serverUrl}details/` + component_id);
  }
}
