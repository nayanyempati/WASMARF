import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpencopsConfirmationService } from '@opencops/services/confirmation';
import { ComponentWeaknessMapping } from 'app/interfaces/componentweaknessmapping.types';
import { Profiles } from 'app/interfaces/profiles.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { Subject } from 'rxjs';
import { ImportWeaknessComponent } from '../../components/view-components/import-weakness/import-weakness.component';
import { ProfilesService } from 'app/server-api/profiles/profiles.service';
import { ImportProfileWeaknessComponent } from './import-profile-weakness/import-profile-weakness.component';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {
  profile: Profiles
  profileid: any
  weaknesscount: number = 0;
  datasource = new MatTableDataSource<ComponentWeaknessMapping>()
  tableColumns: string[] = ['WeaknessName', 'Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private _componentService: ComponentsService,
    private _router: Router,
    private _matDialog: MatDialog,
    private _opencopsConfirmationService: OpencopsConfirmationService,
    private _matSnackBar: MatSnackBar,
    private _profileService: ProfilesService
  ) {
    const path = this._router.url.split('?')[0];
    this.profileid = path.split('/').filter(x => x !== '')[3];
  }

  ngOnInit(): void {
    this.ProfileDetails();
    this.listWeakness();
  }

  ProfileDetails() {
    this._profileService.Details(this.profileid).subscribe({
      next: (response) => {
        this.profile=response;
      },
      error: (error) => {

      }
    })
  }

  listWeakness() {
    this._profileService.ListWeakness(this.profileid).subscribe({
      next: (response) => {
        this.datasource.data = response as ComponentWeaknessMapping[];
        this.weaknesscount = this.datasource.data.length;
      }
    })
  }


  searchWeakness(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.weaknesscount = this.datasource.filteredData.length;
  }

  ImportWeakness() {
    this.dialogRef = this._matDialog.open(ImportProfileWeaknessComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.listWeakness();
    });
  }

  deleteWeakness(item: any) {
    const confirmation = this._opencopsConfirmationService.open({
      title: 'Remove Weakness',
      message: 'Are you sure you want to remove <b>' + item.WeaknessName + '</b>?',
      bgcolor: 'bg-red-100',
      primarytextcolor: 'text-red-900 font-semibold',
      secondarytextxolor: 'text-red-800',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        this._profileService.DeleteWeakness(item.Id).subscribe({
          next: (response) => {
            if (response.Status == "Success") {
              this.listWeakness();
              this._matSnackBar.open(response.Message, 'End now', {
                panelClass: 'snack-success',
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
              this._matDialog.closeAll();
            } else {
              this._matSnackBar.open(response.Message, 'End now', {
                panelClass: 'snack-warning',
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
              });
            }
          },
          error: (error) => {
            this._matSnackBar.open("Something went wrong", 'End now', {
              panelClass: 'snack-error',
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        })
      }
    });
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
