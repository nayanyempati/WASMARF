import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';

@Component({
  selector: 'app-add-countermeasure',
  templateUrl: './add-countermeasure.component.html',
  styleUrls: ['./add-countermeasure.component.scss']
})
export class AddCountermeasureComponent {
  addForm: FormGroup;
  Priorities = [
    { value: 10, label: '10 - High Priority' },
    { value: 9, label: '9' },
    { value: 8, label: '8' },
    { value: 7, label: '7' },
    { value: 6, label: '6' },
    { value: 5, label: '5 - Medium Priority' },
    { value: 4, label: '4' },
    { value: 3, label: '3' },
    { value: 2, label: '2' },
    { value: 1, label: '1 - Low Priority' }
  ]
  Weakensses: []
  Phases:[]
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private _countermeasuresService: CountermeasuresService,
    private _weaknessService: WeaknessService,
    private _matDialog: MatDialog,
    private _phasesServices: PhasesService,
  ) {
    const path = this._router.url.split('?')[0];


  }

  ngOnInit(): void {
    this.ListWeakess();
    this.PhasesList();
    this.addForm = this._formBuilder.group({
      WeaknessId: [null, Validators.required],
      CountermeasureName: [null, [Validators.required]],
      CountermeasureSolution: [null, [Validators.required]],
      CountermeasurePriority: ['1', [Validators.required]],
      Phase: [null, [Validators.required]],
    });
  }

  PhasesList() {
    this._phasesServices.Phases().subscribe({
     next: (response) => {
      this.Phases=response;
     }
    })
   }


  ListWeakess() {
    this._weaknessService.Weakness().subscribe({
      next: (response) => {
        this.Weakensses = response;
      }
    })
  }
  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._countermeasuresService.AddCountermeasure(this.addForm.value).subscribe({
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
