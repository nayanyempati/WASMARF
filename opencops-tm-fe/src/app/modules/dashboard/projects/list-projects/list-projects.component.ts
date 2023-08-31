import { Component, ViewChild } from '@angular/core';
import { AddProjectComponent } from '../add-project/add-project.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { projects } from 'app/interfaces/projects.types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ProjectsService } from 'app/server-api/projects/projects.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent {
  projectsCount: number = 0;
  datasource = new MatTableDataSource<projects>()
  tableColumns: string[] = ['ProjectName','Classification','RiskPolicy','Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _projectService: ProjectsService
  ) {
    this.ListProjects();
  }
  searchProjects(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.projectsCount = this.datasource.filteredData.length;
  }

  CreateProject() {
    this.dialogRef = this._matDialog.open(AddProjectComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw',

    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.ListProjects();
    });
  }

  ListProjects() {
    this._projectService.ListProjects().subscribe({
      next: (response) => {
        this.datasource.data = response as projects[];
        this.projectsCount = this.datasource.data.length;
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
