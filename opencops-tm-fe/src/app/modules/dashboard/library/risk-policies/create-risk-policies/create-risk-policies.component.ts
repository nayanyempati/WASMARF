import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { RiskpoliciesService } from 'app/server-api/riskpolicies/riskpolicies.service';

@Component({
  selector: 'app-create-risk-policies',
  templateUrl: './create-risk-policies.component.html',
  styleUrls: ['./create-risk-policies.component.scss']
})
export class CreateRiskPoliciesComponent {
  addForm: FormGroup
  priorities = [
    { value: 10, label: '10 or higher' },
    { value: 9, label: '9 or higher' },
    { value: 8, label: '8 or higher' },
    { value: 7, label: '7 or higher' },
    { value: 6, label: '6 or higher' },
    { value: 5, label: '5 or higher' },
    { value: 4, label: '4 or higher' },
    { value: 3, label: '3 or higher' },
    { value: 2, label: '2 or higher' },
    { value: 1, label: '1 or higher' }
  ];

  phases: []
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar,
    private _riskPolicyService:RiskpoliciesService
  ) {
    this.Phases();
  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      RiskPolicyName: [null, [Validators.required]],
      RiskPolicyDescription: [null],
      RiskPolicyInclusion: [],
      RiskPolicyCountermeasurePriority:[]
    });
  }

  Phases() {
    this._phasesServices.Phases().subscribe({
      next: (response) => {
        this.phases = response;
      }
    })
  }


  create() {
    if (!this.addForm.valid) {

    }
    console.log(this.addForm.value)
    this.addForm.disable();
    this._riskPolicyService.Create(this.addForm.value).subscribe({
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
