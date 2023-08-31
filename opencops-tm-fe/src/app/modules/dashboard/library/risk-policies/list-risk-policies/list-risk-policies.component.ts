import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Phases } from 'app/interfaces/phases.types';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { Subject } from 'rxjs';
import { CreatePhasesComponent } from '../../phases/create-phases/create-phases.component';
import { RiskpoliciesService } from 'app/server-api/riskpolicies/riskpolicies.service';
import { CreateRiskPoliciesComponent } from '../create-risk-policies/create-risk-policies.component';
import { ViewRiskPoliciesComponent } from '../view-risk-policies/view-risk-policies.component';

@Component({
  selector: 'app-list-risk-policies',
  templateUrl: './list-risk-policies.component.html',
  styleUrls: ['./list-risk-policies.component.scss']
})
export class ListRiskPoliciesComponent {
  count: number = 0
  datasource = new MatTableDataSource<Phases>()
  tableColumns: string[] = ['Name', 'Description', 'Priority', 'Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private _phasesServices: PhasesService,
    private _riskPolicies: RiskpoliciesService,
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    this.List();
  }

  List() {
    this._riskPolicies.List().subscribe({
      next: (response) => {
        console.log(response)
        this.datasource.data = response as Phases[];
        this.count = this.datasource.data.length;
      }
    })
  }

  EditRiskPolicy(item) {
    this.dialogRef = this._matDialog.open(ViewRiskPoliciesComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw',
      data: item
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.List();
    });
  }

  createRiskPolicy() {
    this.dialogRef = this._matDialog.open(CreateRiskPoliciesComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.List();
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
