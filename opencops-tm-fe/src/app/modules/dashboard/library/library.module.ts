import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SurveyComponent } from './survey/survey.component';
import { ComponentsComponent } from './components/components.component';
import { WeaknessComponent } from './weakness/weakness.component';
import { CountermeasuresComponent } from './countermeasures/countermeasures.component';
import { RouterModule, Routes } from '@angular/router';
import { OpencopsHorizontalNavigationComponent } from '@opencops/components/navigation/horizontal/horizontal.component';
import { RiskPoliciesComponent } from './risk-policies/risk-policies.component';


const routes: Routes = [
  {
    path: '', component: LibraryComponent,
    children: [
      { path: 'profiles', loadChildren: () => import('app/modules/dashboard/library/profiles/profiles.module').then(m => m.ProfilesModule) },
      { path: 'components', loadChildren: () => import('app/modules/dashboard/library/components/components.module').then(m => m.ComponentsModule) },
      { path: 'sections', loadChildren: () => import('app/modules/dashboard/library/survey/survey.module').then(m => m.SurveyModule) },    
      { path: 'weakness', loadChildren: () => import('app/modules/dashboard/library/weakness/weakness.module').then(m => m.WeaknessModule) },
      { path: 'countermeasures', loadChildren: () => import('app/modules/dashboard/library/countermeasures/countermeasures.module').then(m => m.CountermeasuresModule) },
      { path: 'categories', loadChildren: () => import('app/modules/dashboard/library/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'phases', loadChildren: () => import('app/modules/dashboard/library/phases/phases.module').then(m => m.PhasesModule) },
      { path: 'risk-policies', loadChildren: () => import('app/modules/dashboard/library/risk-policies/risk-policies.module').then(m => m.RiskPoliciesModule) },
      { path: 'classifications', loadChildren: () => import('app/modules/dashboard/library/classifications/classifications.module').then(m => m.ClassificationsModule) },
    ]
  }
]

@NgModule({
  declarations: [
    LibraryComponent,
    ComponentsComponent,
    WeaknessComponent,
    CountermeasuresComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OpencopsHorizontalNavigationComponent
  ]
})
export class LibraryModule { }
