import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Section } from 'app/interfaces/section.types';
import { Subsections } from 'app/interfaces/subsections.types';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { SubsectionsService } from 'app/server-api/subsections/subsections.service';

@Component({
  selector: 'app-create-sub-section',
  templateUrl: './create-sub-section.component.html',
  styleUrls: ['./create-sub-section.component.scss']
})
export class CreateSubSectionComponent {
  Subsections:Subsections;
  Section:Section;
  addForm:FormGroup;
  section_id:any;
  constructor(
    private _subsectionService: SubsectionsService,
    private _sectionService:SectionsService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar:MatSnackBar
  ) {
    const path = this._router.url.split('?')[0];
    this.section_id = path.split('/').filter(x => x !== '')[3];
  }

  ngOnInit(): void {
    this.SectionDetails();
    this.addForm = this._formBuilder.group({
      SubsectionName: [null, [Validators.required]],
    });
  }

  SectionDetails(){
    this._sectionService.ViewSection(this.section_id).subscribe({
      next:(response)=>{
        this.Section=response;
      }
    })
  }

  CreateSubsection(){
    if(!this.addForm.value){
      return;
    }
    this._subsectionService.CreateSubsection(this.addForm.value, this.section_id).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open("Section created", 'End now', {
            panelClass: 'snack-success',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['dashboard/library/sections/'+this.section_id])
        }else{
          this.addForm.enable();
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-warning',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        }
      },
      error: (error) => {
        this.addForm.enable();
        this._matSnackBar.open("Something went wrong", 'End now', {
          panelClass: 'snack-error',
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    })
  }
}
