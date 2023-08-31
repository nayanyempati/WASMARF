import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassificationsService } from 'app/server-api/classifications/classifications.service';
import { PhasesService } from 'app/server-api/phases/phases.service';

@Component({
  selector: 'app-create-classifications',
  templateUrl: './create-classifications.component.html',
  styleUrls: ['./create-classifications.component.scss']
})
export class CreateClassificationsComponent {
  addForm: FormGroup
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _classificationServices: ClassificationsService,
    private _matSnackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      ClassificationName: [null, [Validators.required]],
      ClassificationDescription: [null],
      RiskPolicyName:[]
    });
  }



  create() {
    if (!this.addForm.valid) {

    }
    this.addForm.disable();
    this._classificationServices.CreateClassification(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._matDialog.closeAll();
        } else {
          this.addForm.enable();
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-warning',
            duration: 2000,
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
