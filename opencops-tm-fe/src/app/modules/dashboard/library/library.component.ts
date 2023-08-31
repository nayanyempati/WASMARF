import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpencopsNavigationItem, OpencopsNavigationService, OpencopsVerticalNavigationComponent } from '@opencops/components/navigation';
import { OpencopsMediaWatcherService } from '@opencops/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    menuData: OpencopsNavigationItem[];
    
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
        this.menuData = [
            {
                id: 'library.profiles',
                title: 'Profiles',
                type: 'basic',
                icon: 'heroicons_outline:currency-dollar',
                link: '/dashboard/library/profiles',
            },

            {
                id: 'library.components',
                title: 'Components',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-check',
                link: '/dashboard/library/components',
            },
            {
                id: 'dashboards.weakness',
                title: 'Weakness',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboard/library/weakness',
            },
            {
                id: 'dashboards.countermeasures',
                title: 'Countermeasures',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/library/countermeasures',
            },
            {
                id: 'dashboards.categories',
                title: 'Categories',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/library/categories',
            },
            {
                id: 'dashboards.phases',
                title: 'Phases',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/library/phases',
            },
            {
                id: 'dashboards.classifications',
                title: 'Classifications',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/library/classifications',
            },
            {
                id: 'dashboards.risk-policies',
                title: 'Risk Policies',
                type: 'basic',
                icon: 'heroicons_outline:banknotes',
                link: '/dashboard/library/risk-policies',
            }
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
