import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentsService } from 'app/server-api/components/components.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';

@Component({
  selector: 'app-project-survey',
  templateUrl: './project-survey.component.html',
  styleUrls: ['./project-survey.component.scss']
})
export class ProjectSurveyComponent {


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
  }

  ngOnInit(): void {
   
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
