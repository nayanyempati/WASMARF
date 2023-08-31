import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Countermeasures } from 'app/interfaces/countermeasures.types';
import { CountermeasuresService } from 'app/server-api/countermeasures/countermeasures.service';
import { Subject } from 'rxjs';
import { AddCountermeasureComponent } from '../add-countermeasure/add-countermeasure.component';

@Component({
  selector: 'app-list-countermeasure',
  templateUrl: './list-countermeasure.component.html',
  styleUrls: ['./list-countermeasure.component.scss']
})
export class ListCountermeasureComponent {
  dialogRef:any;
  counterMeasureCount: number = 0;
  datasource = new MatTableDataSource<Countermeasures>()
  tableColumns: string[] = ['CountermeasureId', 'CountermeasureName', 'Howto'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _countermeasuresService: CountermeasuresService,
    private _matDialog:MatDialog) {

  }


  ngOnInit(): void {
    this.Countermeasures();
  }

  Countermeasures() {
    this._countermeasuresService.Countermeasures().subscribe({
      next: (response) => {
        this.datasource.data = response as Countermeasures[];
        this.counterMeasureCount = this.datasource.data.length;
      }
    })
  }

  create(){
    this.dialogRef = this._matDialog.open(AddCountermeasureComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Countermeasures();
    });
  }

  searchCountermeasure(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.counterMeasureCount = this.datasource.filteredData.length;
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
