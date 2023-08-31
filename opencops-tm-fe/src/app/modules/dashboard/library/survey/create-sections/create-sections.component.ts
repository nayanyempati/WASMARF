import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SectionsService } from 'app/server-api/sections/sections.service';


@Component({
  selector: 'app-create-sections',
  templateUrl: './create-sections.component.html',
  styleUrls: ['./create-sections.component.scss']
})
export class CreateSectionsComponent {
  addForm: UntypedFormGroup;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _dialog: MatDialog,
    private _sectionsService: SectionsService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {

  }
  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      SectionName: [null, [Validators.required]],
    });
  }


  CreateSection(){
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._sectionsService.CreateSection(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open("Section created", 'End now', {
            panelClass: 'snack-success',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['/dashboard/library/sections/'+response.Message])
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
