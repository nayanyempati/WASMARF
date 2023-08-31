import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Profiles } from 'app/interfaces/profiles.types';
import { ProfilesService } from 'app/server-api/profiles/profiles.service';
import { Subject } from 'rxjs';
import { AddProfilesComponent } from '../add-profiles/add-profiles.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent {
  profilesCount:number=0;
  datasource = new MatTableDataSource<Profiles>()
  tableColumns: string[] = ['ProfileName', 'ProfileDescription', 'ProfileIsActive'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef:any;
  constructor(
    private _profileService: ProfilesService,
    private _matSnackBar:MatSnackBar,
    private _matDialog:MatDialog
    ) {

  }


  ngOnInit(): void {
    this.Profiles();
  }

  Profiles() {
    this._profileService.Profiles().subscribe({
      next: (response) => {
        this.datasource.data = response as Profiles[];
        this.profilesCount = this.datasource.data.length;
      }
    })
  }

  searchProfile(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.profilesCount = this.datasource.filteredData.length;
  }

  CreateProfile(){
    this.dialogRef = this._matDialog.open(AddProfilesComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Profiles();
    });
  }
  
  onStatusChange(event: any, ProfileId: number) {
    const target = event.checked as HTMLInputElement;
    this._profileService.UpdateProfileStatus(ProfileId, target).subscribe({
      next: (response) => {
        this._matSnackBar.open(response.Message, 'End now', {
          panelClass: 'snack-success',
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      },
      error: (error) => {
        this._matSnackBar.open("Something went wrong", 'End now', {
          panelClass: 'snack-error',
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    })
  }

  
  /**
* Track by function for ngFor loops
*
* @param index
* @param item
*/
trackByFn(index: number, item: any): any {
  return item.id || index;
}

/**
* On destroy
*/
ngOnDestroy(): void {
  // Unsubscribe from all subscriptions
  this._unsubscribeAll.next(null);
  this._unsubscribeAll.complete();
}



/**
* After view init
*/
ngAfterViewInit(): void {
  this.datasource.sort = this.sort;
  this.datasource.paginator = this.paginator;
}
}
