import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Download } from 'app/class/download';
import { ComponentsService } from 'app/server-api/components/components.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { ReportService } from 'app/server-api/report/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent {
  download$: Observable<Download>
  projectDetails: any
  projectid: any
  componentsCount:number=0;
  weaknessCount:number;
  constructor(
    private _componentService: ComponentsService,
    private _router: Router,
    private _projectService: ProjectsService,
    private _reportService:ReportService
  ) {
    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
    this.ProjectDetails();
    this.ListProjectComponents();
    this.ListProjectWeakness();
  }

  ngOnInit(): void {
   
  }
  CreateReport() {
    this.download$ = this._reportService.Generate(this.projectid,this.projectDetails.ProjectName)
  }


  ProjectDetails() {
    this._projectService.ProjectDetails(this.projectid).subscribe({
      next: (response) => {
        this.projectDetails = response;
      }
    })
  }


  ListProjectWeakness(){
    this._projectService.ListWeakness(this.projectid).subscribe({
      next: (response) => {
        this.weaknessCount = response.length;
        console.log(response)
      }
    })
  }



  ListProjectComponents(){
    this._projectService.ListComponents(this.projectid).subscribe({
      next: (response) => {
        this.componentsCount = response.length;
        console.log(response)
      }
    })
  }

}
