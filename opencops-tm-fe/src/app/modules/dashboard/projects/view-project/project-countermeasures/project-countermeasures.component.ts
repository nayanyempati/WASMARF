import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Weakness } from 'app/interfaces/weakness.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-countermeasures',
  templateUrl: './project-countermeasures.component.html',
  styleUrls: ['./project-countermeasures.component.scss']
})
export class ProjectCountermeasuresComponent {
  projectDetails: any
  projectid: any
  weaknessDetails: any;
  weaknessid: any;
  countermeasureid: any;
  counterMeasureDetails: any;
  constructor(
    private _componentService: ComponentsService,
    private _router: Router,
    private _projectService: ProjectsService,
    private _weaknessService: WeaknessService,
    private _counterMeasureService: CountermeasuresService
  ) {
    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
    this.weaknessid = path.split('/').filter(x => x !== '')[4];
    this.countermeasureid = path.split('/').filter(x => x !== '')[6];
    this.ProjectDetails();
    this.WeaknessDetails();
    this.CountermeasureDetails();
  }

  ngOnInit(): void {

  }
  WeaknessDetails() {
    this._weaknessService.Details(this.weaknessid).subscribe({
      next: (response) => {
        
        this.weaknessDetails = response;
      }
    })
  }
  ProjectDetails() {
    this._projectService.ProjectDetails(this.projectid).subscribe({
      next: (response) => {
        this.projectDetails = response;
      }
    })
  }


  CountermeasureDetails() {
    this._counterMeasureService.Details(this.countermeasureid).subscribe({
      next: (response) => {
        this.counterMeasureDetails = response;
      }
    })
  }


}
