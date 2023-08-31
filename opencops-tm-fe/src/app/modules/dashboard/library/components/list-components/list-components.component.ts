import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Components } from 'app/interfaces/components.types';
import { Subject } from 'rxjs';
import { AddComponentsComponent } from '../add-components/add-components.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentsService } from 'app/server-api/components/components.service';

@Component({
  selector: 'app-list-components',
  templateUrl: './list-components.component.html',
  styleUrls: ['./list-components.component.scss']
})
export class ListComponentsComponent {
  dialogRef: any;
  componentsCount: number = 0;
  datasource = new MatTableDataSource<Components>()
  tableColumns: string[] = ['ComponentName', 'ComponentDescription', 'ComponentType', 'ModifiedOn', 'ComponentStatus'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private _componentService: ComponentsService,
    private _matSnackBar: MatSnackBar,
    public _dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.Components();
  }

  Components() {
    this._componentService.Components().subscribe({
      next: (response) => {
        this.datasource.data = response as Components[];
        this.componentsCount = this.datasource.data.length;
      }
    })
  }

  onStatusChange(event: any, ComponentId: number) {
    const target = event.checked as HTMLInputElement;
    this._componentService.UpdateComponentStatus(ComponentId, target).subscribe({
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
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    })
  }



  searchComponent(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.componentsCount = this.datasource.filteredData.length;
  }


  CreateComponent() {
    this.dialogRef = this._dialog.open(AddComponentsComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Components();
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
