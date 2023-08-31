import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  serverUrl = environment.apiUrl + "sections/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Sections() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  CreateSection(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  ViewSection(section_id: any) {
    return this.http.get<any>(`${this.serverUrl}view/` + section_id);
  }

}
