import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';

@Component({
  selector: 'app-project-weakness-view',
  templateUrl: './project-weakness-view.component.html',
  styleUrls: ['./project-weakness-view.component.scss']
})
export class ProjectWeaknessViewComponent {
  projectDetails: any
  projectid: any
  weaknessid: any;
  weaknessDetails: any;
  countermeasures: any;
  constructor(
    private _router: Router,
    private _projectService: ProjectsService,
    private _weaknessService: WeaknessService,
    private _counterMeasureService: CountermeasuresService,
  ) {
    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
    this.weaknessid = path.split('/').filter(x => x !== '')[4];
    this.ProjectDetails();
    this.WeaknessDetails();
    this.CounterMeasures();
  }

  ProjectDetails() {
    this._projectService.ProjectDetails(this.projectid).subscribe({
      next: (response) => {
        this.projectDetails = response;
      }
    })
  }

  WeaknessDetails() {
    this._weaknessService.Details(this.weaknessid).subscribe({
      next: (response) => {
        console.log(response)
        this.weaknessDetails = response;
      }
    })
  }

  openCwe(cwe) {
    window.open('https://cwe.mitre.org/data/definitions/' + cwe + '.html', '_blank');
  }

  openCountermeasure(item) {
    this._router.navigate(['']);
  }

  CounterMeasures() {
    this._counterMeasureService.ListCountermeasuresByWeaknessId(this.weaknessid).subscribe({
      next: (response) => {
        this.countermeasures = response;
      }
    })
  }
}
