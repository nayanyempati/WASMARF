import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  serverUrl = environment.apiUrl + "questions/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  CreateQuestionAnswer(data: any, subsectionid: any) {
    return this.http.post<any>(`${this.serverUrl}create/` + subsectionid, data, { headers: this.headers })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  Questions(subsectionid: any) {
    return this.http.get<any>(`${this.serverUrl}list/` + subsectionid);
  }
}
