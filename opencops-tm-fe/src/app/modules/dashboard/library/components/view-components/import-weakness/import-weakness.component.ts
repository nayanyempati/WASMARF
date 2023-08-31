import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Components } from 'app/interfaces/components.types';
import { Weakness } from 'app/interfaces/weakness.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-import-weakness',
  templateUrl: './import-weakness.component.html',
  styleUrls: ['./import-weakness.component.scss']
})
export class ImportWeaknessComponent {
  searchControl = new FormControl();
  options: any[] = []
  filteredOptions: Observable<any[]>;
  addForm: FormGroup
  weakness: Weakness
  projectid: any;
  componentid: any;
  WeaknessId: any;
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar,
    private _componentService: ComponentsService,
    private _projectService: ProjectsService,
    private _weaknessService: WeaknessService
  ) {

    const path = this._router.url.split('?')[0];
    this.componentid = path.split('/').filter(x => x !== '')[3];
  }
  ngOnInit() {
    this.WeaknessList();
    this.addForm = this._formBuilder.group({
      WeaknessId: [null,Validators.required],
    });

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.WeaknessName.toLowerCase().includes(filterValue)
    );
  }

  weaknessSelected(event: MatAutocompleteSelectedEvent) {
    this.addForm.get('WeaknessId').setValue(event.option.value);
  }

  WeaknessList() {
    this._weaknessService.Weakness().subscribe({
      next: (response) => {
        console.log(response)
        this.options = response
        this.weakness = response;
      }
    })
  }



  create() {
    if (!this.addForm.valid) {
      return;
    }
    let weaknessId = this.addForm.get("WeaknessId").value;
    this.addForm.disable();
    this._componentService.AddWeakness(this.componentid, weaknessId).subscribe({
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
