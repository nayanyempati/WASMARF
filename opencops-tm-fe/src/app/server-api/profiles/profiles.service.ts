import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  serverUrl = environment.apiUrl + "profiles/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Profiles() {
    return this.http.get<any>(`${this.serverUrl}list`);
  }

  Details(profileid) {
    return this.http.get<any>(`${this.serverUrl}details/` + profileid);
  }

  DeleteWeakness(id) {
    return this.http.get<any>(`${this.serverUrl}deleteweakness/` + id);
  }

  ListWeakness(profileid) {
    return this.http.get<any>(`${this.serverUrl}listweakness/` + profileid);
  }

  ProfileWeaknessMapping(profileid: any, weaknessid) {
    return this.http.post<any>(`${this.serverUrl}profileweaknessmapping/` + profileid + '/' + weaknessid, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  CreateProfile(data: any) {
    return this.http.post<any>(`${this.serverUrl}create`, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  UpdateProfileStatus(profileid: number, status: any) {
    return this.http.put<any>(`${this.serverUrl}updatestatus/` + profileid + '/' + status, null, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
