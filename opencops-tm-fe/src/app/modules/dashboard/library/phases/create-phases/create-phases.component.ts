import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PhasesService } from 'app/server-api/phases/phases.service';

@Component({
  selector: 'app-create-phases',
  templateUrl: './create-phases.component.html',
  styleUrls: ['./create-phases.component.scss']
})
export class CreatePhasesComponent {
  addForm: FormGroup
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      PhaseName: [null, [Validators.required]],
      PhaseDescription: [null],
    });
  }



  create() {
    if (!this.addForm.valid) {

    }
    this.addForm.disable();
    this._phasesServices.CreatePhase(this.addForm.value).subscribe({
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
