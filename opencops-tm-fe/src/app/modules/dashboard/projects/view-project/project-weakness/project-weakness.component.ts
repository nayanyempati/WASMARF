import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Weakness } from 'app/interfaces/weakness.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-project-weakness',
  templateUrl: './project-weakness.component.html',
  styleUrls: ['./project-weakness.component.scss']
})
export class ProjectWeaknessComponent {
  weaknessCount: number = 0;
  datasource = new MatTableDataSource<Weakness>()
  tableColumns: string[] = ['WeaknessId', 'WeaknessName', 'WeaknessCwes', 'WeaknessRiskRating'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  projectDetails: any
  projectid: any
  constructor(
    private _componentService: ComponentsService,
    private _router: Router,
    private _projectService: ProjectsService
  ) {
    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
    this.ProjectDetails();
    this.ListWeakness();
  }

  ngOnInit(): void {
   
  }

  ListWeakness() {
    this._projectService.ListWeakness(this.projectid).subscribe({
      next: (response) => {
        this.datasource.data = response as Weakness[];
        this.weaknessCount = this.datasource.data.length;
      }
    })
  }

  openCwe(cwe){
    window.open('https://cwe.mitre.org/data/definitions/'+cwe+'.html', '_blank');
  }

  ProjectDetails() {
    this._projectService.ProjectDetails(this.projectid).subscribe({
      next: (response) => {
        this.projectDetails = response;
        console.log(response)
      }
    })
  }

}
