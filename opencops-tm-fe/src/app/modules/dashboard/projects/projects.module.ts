import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './list-projects/list-projects.component';
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
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { OpencopsHorizontalNavigationComponent } from '@opencops/components/navigation';
import { SAVER, getSaver } from 'app/class/saver.service';

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ListProjectsComponent,
        data: { title: "List Projects" }
      },
      { path: ':id', loadChildren: () => import('app/modules/dashboard/projects/view-project/view-project.module').then(m => m.ViewProjectModule) },

    ]
  }
]

@NgModule({
  declarations: [
    ProjectsComponent,
    ListProjectsComponent,
    AddProjectComponent,


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
   
  ],

})
export class ProjectsModule { }
