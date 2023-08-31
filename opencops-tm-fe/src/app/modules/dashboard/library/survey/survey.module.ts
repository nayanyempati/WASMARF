import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { Routes, RouterModule } from '@angular/router';
import { ListSectionsComponent } from './list-sections/list-sections.component';
import { CreateSectionsComponent } from './create-sections/create-sections.component';
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
import { ViewSectionComponent } from './view-section/view-section.component';
import { CreateSubSectionComponent } from './view-section/create-sub-section/create-sub-section.component';


const routes: Routes = [
  {
    path: '', component: SurveyComponent,
    children: [
      {
        path: '',
        component: ListSectionsComponent,
        data: { title: "Survey" }
      },
      {
        path: 'create',
        component: CreateSectionsComponent,
        data: { title: "Create Section" }
      },
      {
        path: ':id',
        component: ViewSectionComponent,
        data: { title: "View Section" }
      },
      { path: ':id/subsections', loadChildren: () => import('app/modules/dashboard/library/subsections/subsections.module').then(m => m.SubsectionsModule) },
      {
        path: ':id/create',
        component: CreateSubSectionComponent,
        data: { title: "Create Sub Section" }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SurveyComponent,
    ListSectionsComponent,
    CreateSectionsComponent,
    ViewSectionComponent,
    CreateSubSectionComponent
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
export class SurveyModule { }
