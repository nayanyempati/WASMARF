import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
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
import { AddProfilesComponent } from '../profiles/add-profiles/add-profiles.component';
import { ListProfilesComponent } from '../profiles/list-profiles/list-profiles.component';
import { ProfilesComponent } from '../profiles/profiles.component';
import { ViewProfileComponent } from '../profiles/view-profile/view-profile.component';




const routes: Routes = [
  {
    path: '', component: CategoriesComponent,
    children: [
      {
        path: '',
        component: ListCategoriesComponent,
        data: { title: "List Categories" }
      },
      {
        path: 'create',
        component: AddCategoriesComponent,
        data: { title: "Add Category" }
      },
      {
        path: ':id',
        component: ViewCategoriesComponent,
        data: { title: "View Category" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    CategoriesComponent,
    ListCategoriesComponent,
    AddCategoriesComponent,
    ViewCategoriesComponent
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
    MatTableModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSlideToggleModule,

  ]
})
export class CategoriesModule { }
