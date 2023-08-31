import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponentsComponent } from './list-components/list-components.component';
import { AddComponentsComponent } from './add-components/add-components.component';
import { ViewComponentsComponent } from './view-components/view-components.component';
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
import { ImportWeaknessComponent } from './view-components/import-weakness/import-weakness.component';


const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      {
        path: '',
        component: ListComponentsComponent,
        data: { title: "List Components" }
      },
      {
        path: 'create',
        component: AddComponentsComponent,
        data: { title: "Create Component" }
      },
      {
        path: ':id',
        component: ViewComponentsComponent,
        data: { title: "View Component" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListComponentsComponent,
    AddComponentsComponent,
    ViewComponentsComponent,
    ImportWeaknessComponent
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
export class ComponentsModule { }
