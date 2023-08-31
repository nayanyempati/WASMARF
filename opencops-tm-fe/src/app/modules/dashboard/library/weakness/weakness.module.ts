import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaknessComponent } from './weakness.component';
import { Routes, RouterModule } from '@angular/router';
import { ListWeaknessComponent } from './list-weakness/list-weakness.component';
import { AddWeaknessComponent } from './add-weakness/add-weakness.component';
import { ViewWeaknessComponent } from './view-weakness/view-weakness.component';
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
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  {
    path: '', component: WeaknessComponent,
    children: [
      {
        path: '',
        component: ListWeaknessComponent,
        data: { title: "List Weakness" }
      },
      {
        path: 'create',
        component: AddWeaknessComponent,
        data: { title: "Create Weakness" }
      },
      {
        path: ':id',
        component: ViewWeaknessComponent,
        data: { title: "View Weakness" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListWeaknessComponent,
    AddWeaknessComponent,
    ViewWeaknessComponent
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
    MatChipsModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ]
})
export class WeaknessModule { }
