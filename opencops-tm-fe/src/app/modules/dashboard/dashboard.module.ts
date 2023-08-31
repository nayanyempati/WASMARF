import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'overview', loadChildren: () => import('app/modules/dashboard/overview/overview.module').then(m => m.OverviewModule) },
  { path: 'projects', loadChildren: () => import('app/modules/dashboard/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'library', loadChildren: () => import('app/modules/dashboard/library/library.module').then(m => m.LibraryModule) },

]

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
