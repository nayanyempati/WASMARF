import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationsComponent } from './classifications.component';
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
import { ListClassificationsComponent } from './list-classifications/list-classifications.component';
import { CreateClassificationsComponent } from './create-classifications/create-classifications.component';
import { ViewClassificationsComponent } from './view-classifications/view-classifications.component';


const routes: Routes = [
  {
    path: '', component: ClassificationsComponent,
    children: [
      {
        path: '',
        component: ListClassificationsComponent,
        data: { title: "List Classifications" }
      },
      {
        path: 'create',
        component: CreateClassificationsComponent,
        data: { title: "Create Classifications" }
      },
      {
        path: ':id/view',
        component: ViewClassificationsComponent,
        data: { title: "View Classifications" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ClassificationsComponent,
    ListClassificationsComponent,
    CreateClassificationsComponent
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
export class ClassificationsModule { }
