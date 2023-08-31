import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Components } from 'app/interfaces/components.types';
import { ComponentWeaknessMapping } from 'app/interfaces/componentweaknessmapping.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { Subject } from 'rxjs';
import { ImportWeaknessComponent } from './import-weakness/import-weakness.component';
import { OpencopsConfirmationService } from '@opencops/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-components',
  templateUrl: './view-components.component.html',
  styleUrls: ['./view-components.component.scss']
})
export class ViewComponentsComponent {
  component: Components
  component_id: any
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
    private _opencopsConfirmationService:OpencopsConfirmationService,
    private _matSnackBar:MatSnackBar
  ) {
    const path = this._router.url.split('?')[0];
    this.component_id = path.split('/').filter(x => x !== '')[3];
  }

  ngOnInit(): void {
    this.ComponentDetails();
    this.listWeakness();
  }

  ComponentDetails() {
    this._componentService.ComponentDetails(this.component_id).subscribe({
      next: (response) => {
        this.component = response;
      },
      error: (error) => {

      }
    })
  }

  listWeakness() {
    this._componentService.ListComponentWeakness(this.component_id).subscribe({
      next: (response) => {
        this.datasource.data = response as ComponentWeaknessMapping[];
        this.weaknesscount = this.datasource.data.length;
      }
    })
  }


  searchComponent(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.weaknesscount = this.datasource.filteredData.length;
  }

  ImportWeakness() {
    this.dialogRef = this._matDialog.open(ImportWeaknessComponent, {
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
      title: 'Remove Component',
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
        this._componentService.DeleteWeakness(this.component_id, item.Id).subscribe({
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
