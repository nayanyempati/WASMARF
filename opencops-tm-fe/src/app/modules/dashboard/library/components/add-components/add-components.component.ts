import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComponentsService } from 'app/server-api/components/components.service';


@Component({
  selector: 'app-add-components',
  templateUrl: './add-components.component.html',
  styleUrls: ['./add-components.component.scss']
})
export class AddComponentsComponent {
  addForm: UntypedFormGroup;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    public _dialog: MatDialog,
    private _componentService: ComponentsService,
    private _matSnackBar: MatSnackBar,
    private _router:Router
  ) {

  }

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      ComponentName: [null, [Validators.required]],
      ComponentDescription: [null, [Validators.maxLength(500)]]
    });
  }

  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._componentService.CreateComponent(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['/dashboard/library/components'])
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
