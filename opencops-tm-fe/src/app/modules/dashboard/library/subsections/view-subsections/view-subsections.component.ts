import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Questions } from 'app/interfaces/questions.types';
import { Subsections } from 'app/interfaces/subsections.types';
import { QuestionsService } from 'app/server-api/questions/questions.service';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { SubsectionsService } from 'app/server-api/subsections/subsections.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-subsections',
  templateUrl: './view-subsections.component.html',
  styleUrls: ['./view-subsections.component.scss']
})
export class ViewSubsectionsComponent {
  subsection: Subsections
  SubsectionId: any;
  SectionId: any;
  updateForm: UntypedFormGroup;
  questionsCount: number = 0;
  datasource = new MatTableDataSource<Questions>()
  tableColumns: string[] = ['Question', 'MoveSubsection'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private _sectionService: SectionsService,
    private _subsectionService: SubsectionsService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _questionService: QuestionsService
  ) {
    const path = this._router.url.split('?')[0];
    this.SectionId = path.split('/').filter(x => x !== '')[3];
    this.SubsectionId = path.split('/').filter(x => x !== '')[5];
  }

  ngOnInit(): void {
    this.Subsection();
    this.Questions();
    this.updateForm = this._formBuilder.group({
      SubsectionName: [null, [Validators.required]],
    });
  }

  Subsection() {
    this._subsectionService.ViewSubsection(this.SectionId, this.SubsectionId).subscribe({
      next: (response) => {
        this.subsection = response;
        this.updateForm = this.UpdateSubsectionForm();
      }
    })
  }

  Questions() {
    this._questionService.Questions(this.SubsectionId).subscribe({
      next: (response) => {
        this.datasource.data = response as Questions[];
        this.questionsCount = this.datasource.data.length;
      }
    })
  }

  UpdateSubsectionForm(): FormGroup {
    return this._formBuilder.group({
      SubsectionName: [this.subsection.SubsectionName]
    })
  }


  /**
* Track by function for ngFor loops
*
* @param index
* @param item
*/
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }



  /**
  * After view init
  */
  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

}
