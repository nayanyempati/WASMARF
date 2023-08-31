import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categories } from 'app/interfaces/categories.types';
import { CategoryService } from 'app/server-api/category/category.service';
import { Subject } from 'rxjs';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {
  categoryCount: number = 0
  datasource = new MatTableDataSource<Categories>()
  tableColumns: string[] = ['Name', 'Description'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef:any;
  constructor(
    private _categoryService: CategoryService,
    private _matSnackBar: MatSnackBar,
    private _matDialog:MatDialog
  ) {

  }

  ngOnInit(): void {
    this.Categories();
  }

  Categories() {
    this._categoryService.Categories().subscribe({
      next: (response) => {
        this.datasource.data = response as Categories[];
        this.categoryCount = this.datasource.data.length;
      }
    })
  }

  CreateCategory(){
    this.dialogRef = this._matDialog.open(AddCategoriesComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw',

    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.Categories();
    });
  }

  searchCategory(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.categoryCount = this.datasource.filteredData.length;
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
