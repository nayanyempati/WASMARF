import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Phases } from 'app/interfaces/phases.types';
import { ClassificationsService } from 'app/server-api/classifications/classifications.service';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { RiskpoliciesService } from 'app/server-api/riskpolicies/riskpolicies.service';
import { Subject } from 'rxjs';
import { CreatePhasesComponent } from '../../phases/create-phases/create-phases.component';
import { Classifications } from 'app/interfaces/classifications.types';
import { CreateClassificationsComponent } from '../create-classifications/create-classifications.component';
import { ViewClassificationsComponent } from '../view-classifications/view-classifications.component';

@Component({
  selector: 'app-list-classifications',
  templateUrl: './list-classifications.component.html',
  styleUrls: ['./list-classifications.component.scss']
})
export class ListClassificationsComponent {

  count: number = 0
  datasource = new MatTableDataSource<Classifications>()
  tableColumns: string[] = ['Name', 'Description', 'Riskpolicy','Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private _phasesServices: PhasesService,
    private _riskPolicies: RiskpoliciesService,
    private _classificationServices: ClassificationsService,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.Classifications();
  }

  Classifications() {
    this._classificationServices.Classifications().subscribe({
      next: (response) => {
        this.datasource.data = response as Classifications[];
        this.count = this.datasource.data.length;
      }
    })
  }


  EditClassification(item){
    this.dialogRef = this._matDialog.open(ViewClassificationsComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw',
      data: item
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Classifications();
    });
  }

  createClassification () {
    this.dialogRef = this._matDialog.open(CreateClassificationsComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Classifications();
    });
  }

  search(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.count = this.datasource.filteredData.length;
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
