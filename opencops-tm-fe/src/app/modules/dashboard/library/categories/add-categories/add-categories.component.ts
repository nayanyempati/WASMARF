import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'app/server-api/category/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {
  addForm: FormGroup
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _categoryService: CategoryService,
    private _matSnackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      CategoryName: [null, [Validators.required]],
      CategoryDescription: [null, [Validators.required]],
    });
  }



  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._categoryService.CreateCategory(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['/dashboard/library/categories'])
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
