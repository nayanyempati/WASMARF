import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Components } from 'app/interfaces/components.types';
import { ComponentsService } from 'app/server-api/components/components.service';
import { ProjectsService } from 'app/server-api/projects/projects.service';
import { Subject } from 'rxjs';
import { ImportProjectComponentsComponent } from './import-project-components/import-project-components.component';
import { OpencopsConfirmationService } from '@opencops/services/confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-components',
  templateUrl: './project-components.component.html',
  styleUrls: ['./project-components.component.scss']
})
export class ProjectComponentsComponent {
  componentsCount: number = 0
  projectDetails: any
  projectid: any
  datasource = new MatTableDataSource<Components>()
  tableColumns: string[] = ['ComponentName', 'Action'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dialogRef: any;
  constructor(
    private _componentService: ComponentsService,
    private _router: Router,
    private _projectService: ProjectsService,
    private _opencopsConfirmationService: OpencopsConfirmationService,
    private _matDialog: MatDialog,
    private _matSnackBar:MatSnackBar
  ) {
    const path = this._router.url.split('?')[0];
    this.projectid = path.split('/').filter(x => x !== '')[2];
    this.ProjectDetails();
  }

  ngOnInit(): void {
    this.ListProjectComponents();
  }

  ListProjectComponents() {
    this._projectService.ListComponents(this.projectid).subscribe({
      next: (response) => {
        this.datasource.data = response as Components[];
        this.componentsCount = this.datasource.data.length;
      }
    })
  }

  deleteComponent(item) {
    const confirmation = this._opencopsConfirmationService.open({
      title: 'Remove Component',
      message: 'Are you sure you want to remove <b>' + item.ComponentName + '</b>?',
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
        this._projectService.DeleteComponent(this.projectid, item.ComponentId).subscribe({
          next: (response) => {
            if (response.Status == "Success") {
              this.ListProjectComponents();
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

  ProjectDetails() {
    this._projectService.ProjectDetails(this.projectid).subscribe({
      next: (response) => {
        this.projectDetails = response;
      }
    })
  }


  ImportComponents() {
    this.dialogRef = this._matDialog.open(ImportProjectComponentsComponent, {
      disableClose: false,
      panelClass: 'custom-model',
      width: '45vw'
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.ListProjectComponents();
    });
  }

  searchComponent(key) {
    key = key.trim();
    key = key.toLowerCase();
    this.datasource.filter = key;
    this.componentsCount = this.datasource.filteredData.length;
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
