import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'app/server-api/category/category.service';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';
import { startWith, map } from 'rxjs';

@Component({
  selector: 'app-add-weakness',
  templateUrl: './add-weakness.component.html',
  styleUrls: ['./add-weakness.component.scss']
})
export class AddWeaknessComponent {
  addForm: FormGroup
  Categories: any
  RiskRatings = [
    { value: 10, label: '10 - High Risk' },
    { value: 9, label: '9' },
    { value: 8, label: '8' },
    { value: 7, label: '7' },
    { value: 6, label: '6' },
    { value: 5, label: '5 - Medium Priority' },
    { value: 4, label: '4' },
    { value: 3, label: '3' },
    { value: 2, label: '2' },
    { value: 1, label: '1 - Low Risk' }
  ];
  constructor(private _weaknessService: WeaknessService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _countermeasuresService: CountermeasuresService,
    private _CategoryService: CategoryService,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) {
    this.WeaknessCategories();
    const path = this._router.url.split('?')[0];

  }
  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      WeaknessName: [null, [Validators.required]],
      WeaknessDescription: [null, [Validators.required]],
      WeaknessRiskRating: [null, [Validators.required]],
      WeaknessCwes: [null],
      WeaknessCategory: [null, [Validators.required]],
    });
  }

  WeaknessCategories() {
    this._CategoryService.Categories().subscribe({
      next: (response) => {
        this.Categories = response
      }
    })
  }

  create() {
    if (!this.addForm.valid) {
      return;
    }
    this.addForm.disable();
    this._weaknessService.CreateWeakness(this.addForm.value).subscribe({
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
