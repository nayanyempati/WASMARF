import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  serverUrl = environment.apiUrl + "projects/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  CreateProject(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  ListProjects() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  ProjectDetails(projectid) {
    return this.http.get<any>(`${this.serverUrl}details/` + projectid);
  }

  AddComponent(data: any, projectid: number) {
    return this.http.post<any>(`${this.serverUrl}addcomponent/` + projectid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  ListComponents(projectid: any) {
    return this.http.get<any>(`${this.serverUrl}listcomponents/` + projectid);
  }

  ListWeakness(projectid: any) {
    return this.http.get<any>(`${this.serverUrl}listweakness/` + projectid);
  }


  DeleteComponent(projectid: any, componentid: any) {
    return this.http.delete<any>(`${this.serverUrl}deletecomponent/` + projectid + "/" + componentid);
  }
}
