import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl = environment.apiUrl + "categories/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Categories() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  CreateCategory(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  UpdateCategory(componentid: number, data: any) {
    return this.http.put<any>(`${this.serverUrl}update/` + componentid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }


  CategoryDetails(categoryid: number) {
    return this.http.get<any>(`${this.serverUrl}details/` + categoryid);
  }

}
