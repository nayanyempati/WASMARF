import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'app/server-api/dashboard/dashboard.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  details:any;
  constructor(
    private _dashboardService: DashboardService,
    private _router: Router,
    private _projectService: ProjectsService
  ) {

  }

  ngOnInit(): void {
    this.Overview();
  }

  Overview(){
    this._dashboardService.Overview().subscribe({
      next:(response)=>{
        this.details=response;
      }
    })
  }
}
