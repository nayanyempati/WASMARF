import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  {
    path: '', component: OverviewComponent,
    data: { title: "Overview" }
  }
]

@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ]
})
export class OverviewModule { }
