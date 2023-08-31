import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Components } from 'app/interfaces/components.types';
import { Survey } from 'app/interfaces/survey.types';
import { SectionsService } from 'app/server-api/sections/sections.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-list-sections',
  templateUrl: './list-sections.component.html',
  styleUrls: ['./list-sections.component.scss']
})
export class ListSectionsComponent {
  datasource = new MatTableDataSource<Survey>()
  surveyCount:number=0;
  tableColumns: string[] = ['Id', 'SectionName', 'Subsections'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private _sectionsService: SectionsService,
    private _matSnackBar: MatSnackBar,
    public _dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.Survey();
  }

  searchSections(key){
    
  }

  Survey() {
    this._sectionsService.Sections().subscribe({
      next: (response) => {
        this.datasource.data = response as Survey[];
        this.surveyCount = this.datasource.data.length;
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
