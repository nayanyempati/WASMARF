import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProjectComponent } from './view-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectsComponent } from '../list-projects/list-projects.component';
import { ProjectsComponent } from '../projects.component';
import { ProjectOverviewComponent } from './project-overview/project-overview.component';
import { OpencopsHorizontalNavigationComponent } from '@opencops/components/navigation';
import { ProjectSurveyComponent } from './project-survey/project-survey.component';
import { ProjectComponentsComponent } from './project-components/project-components.component';
import { ProjectThreatsComponent } from './project-threats/project-threats.component';
import { ProjectWeaknessComponent } from './project-weakness/project-weakness.component';
import { ProjectCountermeasuresComponent } from './project-countermeasures/project-countermeasures.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ImportProjectComponentsComponent } from './project-components/import-project-components/import-project-components.component';
import { ProjectWeaknessViewComponent } from './project-weakness/project-weakness-view/project-weakness-view.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



const routes: Routes = [
  {
    path: '', component: ViewProjectComponent,
    children: [
      { path: 'overview', component: ProjectOverviewComponent, data: { title: "Project Overview" } },
      { path: 'survey', component: ProjectSurveyComponent, data: { title: "Project Survey" } },
      { path: 'components', component: ProjectComponentsComponent, data: { title: "Project Components" } },
      { path: 'threats', component: ProjectThreatsComponent, data: { title: "Project Threats" } },
      { path: 'weakness', component: ProjectWeaknessComponent, data: { title: "Project Weakness" } },
      { path: 'weakness/:id', component: ProjectWeaknessViewComponent, data: { title: "Project View Weakness" } },
      { path: 'weakness/:id/countermeasures/:id', component: ProjectCountermeasuresComponent, data: { title: "Project Countermeasures" } },
      { path: 'report', component: ProjectReportComponent, data: { title: "Project Report" } }
    ]
  }
]

@NgModule({
  declarations: [
    ViewProjectComponent,
    ProjectOverviewComponent,
    ProjectSurveyComponent,
    ProjectComponentsComponent,
    ProjectThreatsComponent,
    ProjectWeaknessComponent,
    ProjectCountermeasuresComponent,
    ProjectReportComponent,
    ImportProjectComponentsComponent,
    ProjectWeaknessViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
    OpencopsHorizontalNavigationComponent,
    MatProgressBarModule

  ]
})
export class ViewProjectModule { }
