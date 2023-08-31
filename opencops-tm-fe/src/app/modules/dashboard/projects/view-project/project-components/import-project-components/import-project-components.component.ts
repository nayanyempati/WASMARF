import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Components } from 'app/interfaces/components.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';

@Component({
  selector: 'app-import-project-components',
  templateUrl: './import-project-components.component.html',
  styleUrls: ['./import-project-components.component.scss']
})
export class ImportProjectComponentsComponent {
  addForm: FormGroup
  components: Components
  projectid: any;
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar,
    private _componentService: ComponentsService,
    private _projectService: ProjectsService
  ) {

    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
  }
  ngOnInit() {
    this.ComponentsList();
    this.addForm = this._formBuilder.group({
      ComponentId: [null, [Validators.required]],
    });
  }


  ComponentsList() {
    this._componentService.Components().subscribe({
      next: (response) => {
        this.components = response;
      }
    })
  }



  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._projectService.AddComponent(this.addForm.value, this.projectid).subscribe({
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
