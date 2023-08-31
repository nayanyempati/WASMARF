import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhasesComponent } from './phases.component';
import { ListPhasesComponent } from './list-phases/list-phases.component';
import { CreatePhasesComponent } from './create-phases/create-phases.component';
import { ViewPhasesComponent } from './view-phases/view-phases.component';
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
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '', component: PhasesComponent,
    children: [
      {
        path: '',
        component: ListPhasesComponent,
        data: { title: "Phases" }
      },
      {
        path: 'create',
        component: CreatePhasesComponent,
        data: { title: "Create Phases" }
      },
      {
        path: ':id',
        component: ViewPhasesComponent,
        data: { title: "View Section" }
      },
    ]
  }
]

@NgModule({
  declarations: [
    PhasesComponent,
    ListPhasesComponent,
    CreatePhasesComponent,
    ViewPhasesComponent
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
  ]
})
export class PhasesModule { }
