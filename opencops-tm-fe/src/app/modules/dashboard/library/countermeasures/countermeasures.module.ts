import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountermeasuresComponent } from './countermeasures.component';
import { Routes, RouterModule } from '@angular/router';
import { ViewCountermeasureComponent } from './view-countermeasure/view-countermeasure.component';
import { AddCountermeasureComponent } from './add-countermeasure/add-countermeasure.component';
import { ListCountermeasureComponent } from './list-countermeasure/list-countermeasure.component';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';



const routes: Routes = [
  {
    path: '', component: CountermeasuresComponent,
    children: [
      {
        path: '',
        component: ListCountermeasureComponent,
        data: { title: "List Components" }
      },
      {
        path: 'create',
        component: AddCountermeasureComponent,
        data: { title: "Create Component" }
      },
      {
        path: ':id',
        component: ViewCountermeasureComponent,
        data: { title: "View Component" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ViewCountermeasureComponent,
    AddCountermeasureComponent,
    ListCountermeasureComponent
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
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
  ]
})
export class CountermeasuresModule { }
