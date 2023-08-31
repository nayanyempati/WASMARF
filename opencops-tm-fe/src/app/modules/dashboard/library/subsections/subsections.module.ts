import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsectionsComponent } from './subsections.component';
import { RouterModule, Routes } from '@angular/router';
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
import { CreateSectionsComponent } from '../survey/create-sections/create-sections.component';
import { ListSectionsComponent } from '../survey/list-sections/list-sections.component';
import { SurveyComponent } from '../survey/survey.component';
import { CreateSubSectionComponent } from '../survey/view-section/create-sub-section/create-sub-section.component';
import { ViewSectionComponent } from '../survey/view-section/view-section.component';
import { ViewSubsectionsComponent } from './view-subsections/view-subsections.component';
import { CreatequestionComponent } from './view-subsections/createquestion/createquestion.component';
import { OpencopsAlertComponent } from '@opencops/components/alert';
import { EditQuestionComponent } from './view-subsections/edit-question/edit-question.component';




const routes: Routes = [
  {
    path: ':id', component: SubsectionsComponent,
    children:[
      {
        path:'',
        component:ViewSubsectionsComponent,
        data: { title: "Edit Subsection" }
      },
      {
        path:'question/create',
        component:CreatequestionComponent,
        data: { title: "Create Question" }
      },
      {
        path:'question/:id',
        component:EditQuestionComponent,
        data: { title: "Edit Question" }
      },
      
    ]
  }
]

@NgModule({
  declarations: [
   SubsectionsComponent,
   ViewSubsectionsComponent,
   CreatequestionComponent,
   EditQuestionComponent
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
    OpencopsAlertComponent
  ]
})
export class SubsectionsModule { }
