import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './profiles.component';
import { Routes, RouterModule } from '@angular/router';
import { ListProfilesComponent } from './list-profiles/list-profiles.component';
import { AddProfilesComponent } from './add-profiles/add-profiles.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
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
import { ImportProfileWeaknessComponent } from './view-profile/import-profile-weakness/import-profile-weakness.component';


const routes: Routes = [
  {
    path: '', component: ProfilesComponent,
    children: [
      {
        path: '',
        component: ListProfilesComponent,
        data: { title: "Profiles" }
      },
      {
        path: 'create',
        component: AddProfilesComponent,
        data: { title: "Create Profile" }
      },
      {
        path: ':id',
        component: ViewProfileComponent,
        data: { title: "View Profile" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProfilesComponent,
    ListProfilesComponent,
    AddProfilesComponent,
    ViewProfileComponent,
    ImportProfileWeaknessComponent
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
export class ProfilesModule { }
