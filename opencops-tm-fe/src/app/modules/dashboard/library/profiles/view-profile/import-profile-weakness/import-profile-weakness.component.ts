import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Weakness } from 'app/interfaces/weakness.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { ProfilesService } from 'app/server-api/profiles/profiles.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-import-profile-weakness',
  templateUrl: './import-profile-weakness.component.html',
  styleUrls: ['./import-profile-weakness.component.scss']
})
export class ImportProfileWeaknessComponent {

  searchControl = new FormControl();
  options: any[] = []
  filteredOptions: Observable<any[]>;
  addForm: FormGroup
  weakness: Weakness
  projectid: any;
  profileid: any;
  WeaknessId: any;
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar,
    private _componentService: ComponentsService,
    private _projectService: ProjectsService,
    private _weaknessService: WeaknessService,
    private _profileService: ProfilesService
  ) {

    const path = this._router.url.split('?')[0];
    this.profileid = path.split('/').filter(x => x !== '')[3];
  }
  ngOnInit() {
    this.WeaknessList();
    this.addForm = this._formBuilder.group({
      WeaknessId: [null, Validators.required],
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
    this._profileService.ProfileWeaknessMapping(this.profileid, weaknessId).subscribe({
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
