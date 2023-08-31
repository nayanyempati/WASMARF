import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgModule } from '@angular/core';
import { Download, download } from 'app/class/download';
import { SAVER, Saver, getSaver } from 'app/class/saver.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  serverUrl = environment.apiUrl + "report/";
  private _authenticated: boolean = false;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    @Inject(SAVER) private save: Saver) {
  }

  Generate(projectid: any, name: string): Observable<Download> {
    console.log(name)
    return this.http.get(`${this.serverUrl}generate/` + projectid, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    }).pipe(download(blob => this.save(blob, name.toUpperCase() + "_REPORT.docx")))
  }

}
