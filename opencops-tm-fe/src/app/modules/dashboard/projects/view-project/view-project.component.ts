import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpencopsNavigationItem, OpencopsNavigationService, OpencopsVerticalNavigationComponent } from '@opencops/components/navigation';
import { OpencopsMediaWatcherService } from '@opencops/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent {
  isScreenSmall: boolean;
  navigation: Navigation;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  menuData: OpencopsNavigationItem[];
  projectId:any

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _opencopsMediaWatcherService: OpencopsMediaWatcherService,
    private _opencopsNavigationService: OpencopsNavigationService,
  ) {
    const path = this._router.url.split('?')[0];
    this.projectId = path.split('/').filter(x => x !== '')[2];
    this.menuData = [
      {
        id: 'projects.overview',
        title: 'Overview',
        type: 'basic',
        icon: 'heroicons_outline:currency-dollar',
        link: '/dashboard/projects/'+this.projectId+'/overview',
      },
      {
        id: 'projects.components',
        title: 'Components',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-check',
        link: '/dashboard/projects/'+this.projectId+'/components',
      },
      {
        id: 'projects.weakness',
        title: 'Weakness',
        type: 'basic',
        icon: 'heroicons_outline:banknotes',
        link: '/dashboard/projects/'+this.projectId+'/weakness',
      },
      // {
      //   id: 'projects.countermeasures',
      //   title: 'Countermeasures',
      //   type: 'basic',
      //   icon: 'heroicons_outline:banknotes',
      //   link: '/dashboard/projects/'+this.projectId+'/countermeasures',
      // },
      // {
      //   id: 'projects.report',
      //   title: 'Report',
      //   type: 'basic',
      //   icon: 'heroicons_outline:banknotes',
      //   link: '/dashboard/projects/'+this.projectId+'/report',
      // }
    ]
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    // Subscribe to media changes
    this._opencopsMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
      });
  }


  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation = this._opencopsNavigationService.getComponent<OpencopsVerticalNavigationComponent>(name);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

}
