import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subsections } from 'app/interfaces/subsections.types';
import { Survey } from 'app/interfaces/survey.types';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { SubsectionsService } from 'app/server-api/subsections/subsections.service';


@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent {
  Survey: Survey
  section_id: any
  updateForm: UntypedFormGroup;
  datasource = new MatTableDataSource<Subsections>()
  subsectionCount:number=0;
  tableColumns: string[] = ['Order', 'SubsectionName', 'MoveSubsection','Action'];
  constructor(
    private _sectionService: SectionsService,
    private _subsectionService:SubsectionsService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    const path = this._router.url.split('?')[0];
    this.section_id = path.split('/').filter(x => x !== '')[3];
  }

  ngOnInit(): void {
    this.SectionDetails();
    this.Subsections();
    this.updateForm = this._formBuilder.group({
      SectionName: [null, [Validators.required]],
    });
  }

  SectionDetails() {
    this._sectionService.ViewSection(this.section_id).subscribe({
      next: (response) => {
        this.Survey = response;
        this.updateForm = this.UpdateSurveyForm();
      },
      error: (error) => {

      }
    })
  }
  UpdateSurveyForm(): FormGroup {
    return this._formBuilder.group({
      SectionName: [this.Survey.SectionName]
    })
  }

  Subsections(){
    this._subsectionService.Subsections(this.section_id).subscribe({
      next:(response)=>{
        this.datasource.data = response as Subsections[];
        this.subsectionCount = this.datasource.data.length;
      }
    })
  }

  Updatesection(){
    
  }

}
