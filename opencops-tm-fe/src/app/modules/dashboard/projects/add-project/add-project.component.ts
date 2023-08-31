import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClassificationsService } from 'app/server-api/classifications/classifications.service';
import { ProfilesService } from 'app/server-api/profiles/profiles.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { RiskpoliciesService } from 'app/server-api/riskpolicies/riskpolicies.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  addForm: FormGroup
  riskPolicies: []
  classifications: []
  profiles: []
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _matSnackBar: MatSnackBar,
    private _riskPolicyService: RiskpoliciesService,
    private _projectService: ProjectsService,
    private _classificationService: ClassificationsService,
    private _profileService: ProfilesService
  ) {
    this.RiskPolicies();
    this.ListClassifications();
    this.ProfilesList();
  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      ProjectName: [null, [Validators.required]],
      ProjctDescription: [null],
      RiskPolicyId: [null, [Validators.required]],
      ProfileId: [null, [Validators.required]]
    });
  }

  ProfilesList() {
    this._profileService.Profiles().subscribe({
      next: (response) => {
        console.log(response)
        this.profiles = response;
      }
    })
  }


  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._projectService.CreateProject(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._matDialog.closeAll();
          this._router.navigate(['/dashboard/projects'])
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

  ListClassifications() {
    this._classificationService.Classifications().subscribe({
      next: (response) => {
        this.classifications = response;
      }
    })
  }

  RiskPolicies() {
    this._riskPolicyService.List().subscribe({
      next: (response) => {
        this.riskPolicies = response;
      }
    })
  }

}
