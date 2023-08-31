import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubsectionsService {

  serverUrl = environment.apiUrl + "subsections/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Subsections(sectionid:any) {
    return this.http.get<any>(`${this.serverUrl}list/`+sectionid);
  }

  CreateSubsection(data: any, sectionid:any) {
    return this.http.post<any>(`${this.serverUrl}create/`+sectionid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  ViewSubsection(sectionid: any, subsectionid) {
    return this.http.get<any>(`${this.serverUrl}view/` + sectionid+"/"+subsectionid);
  }

}
