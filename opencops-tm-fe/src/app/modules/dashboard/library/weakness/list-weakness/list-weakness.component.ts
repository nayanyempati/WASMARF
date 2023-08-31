import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Weakness } from 'app/interfaces/weakness.types';
import { WeaknessService } from 'app/server-api/weakness/weakness.service';

import { Subject } from 'rxjs';
import { AddWeaknessComponent } from '../add-weakness/add-weakness.component';

@Component({
  selector: 'app-list-weakness',
  templateUrl: './list-weakness.component.html',
  styleUrls: ['./list-weakness.component.scss']
})
export class ListWeaknessComponent {
  weaknessCount: number = 0;
  dialogRef: any;
  datasource = new MatTableDataSource<Weakness>()
  tableColumns: string[] = ['WeaknessId', 'WeaknessName', 'WeaknessCwes', 'WeaknessRiskRating', 'Countermeasures'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private _weaknessService: WeaknessService,
    private _matDialog: MatDialog) {

  }


  ngOnInit(): void {
    this.Weakness();
  }
  Weakness() {
    this._weaknessService.Weakness().subscribe({
      next: (response) => {
        this.datasource.data = response as Weakness[];
        this.weaknessCount = this.datasource.data.length;
      }
    })
  }

  searchWeakness(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.weaknessCount = this.datasource.filteredData.length;
  }


  CreateWeakness() {
    this.dialogRef = this._matDialog.open(AddWeaknessComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Weakness();
    });
  }

  openCwe(cwe) {
    window.open('https://cwe.mitre.org/data/definitions/' + cwe + '.html', '_blank');
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
