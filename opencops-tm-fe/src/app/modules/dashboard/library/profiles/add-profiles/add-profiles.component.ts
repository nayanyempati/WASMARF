import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfilesService } from 'app/server-api/profiles/profiles.service';


@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrls: ['./add-profiles.component.scss']
})
export class AddProfilesComponent {
  addForm: FormGroup
  constructor(
    private _matDialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _profileService: ProfilesService,
    private _matSnackBar:MatSnackBar
  ) {

  }
  ngOnInit() {
    this.addForm = this._formBuilder.group({
      ProfileName: [null, [Validators.required]],
      ProfileDescription: [null, [Validators.required]],
    });
  }



  createProfile(){
    if(!this.addForm.valid){

    }
    this.addForm.disable();
    this._profileService.CreateProfile(this.addForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._matSnackBar.open(response.Message, 'End now', {
            panelClass: 'snack-success',
            duration:2000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
          this._router.navigate(['/dashboard/library/profiles'])
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
