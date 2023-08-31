import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  serverUrl = environment.apiUrl + "answers/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient) {
  }

  Answers(subsectionid: any, QuestionId:any) {
    return this.http.get<any>(`${this.serverUrl}list/` + subsectionid+"/"+QuestionId);
  }
}
