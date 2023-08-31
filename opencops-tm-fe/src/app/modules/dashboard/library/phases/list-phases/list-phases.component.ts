import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categories } from 'app/interfaces/categories.types';
import { Phases } from 'app/interfaces/phases.types';
import { PhasesService } from 'app/server-api/phases/phases.service';
import { Subject } from 'rxjs';
import { CreatePhasesComponent } from '../create-phases/create-phases.component';

@Component({
  selector: 'app-list-phases',
  templateUrl: './list-phases.component.html',
  styleUrls: ['./list-phases.component.scss']
})
export class ListPhasesComponent {
  count: number = 0
  datasource = new MatTableDataSource<Phases>()
  tableColumns: string[] = ['Name', 'Description','Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef:any;
  constructor(
    private _phasesServices: PhasesService,
    private _matSnackBar: MatSnackBar,
    private _matDialog:MatDialog
  ) {

  }

  ngOnInit(): void {
    this.Phases();
  }

  Phases() {
   this._phasesServices.Phases().subscribe({
    next: (response) => {
      this.datasource.data = response as Phases[];
      this.count = this.datasource.data.length;
    }
   })
  }

  EditPhase(item){

  }


  createPhase(){
    this.dialogRef = this._matDialog.open(CreatePhasesComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width:'45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Phases();
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
