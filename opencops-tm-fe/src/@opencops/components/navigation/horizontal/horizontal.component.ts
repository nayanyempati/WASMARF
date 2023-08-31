import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { opencopsAnimations } from '@opencops/animations';
import { OpencopsNavigationService } from '@opencops/components/navigation/navigation.service';
import { OpencopsNavigationItem } from '@opencops/components/navigation/navigation.types';
import { OpencopsUtilsService } from '@opencops/services/utils/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { OpencopsHorizontalNavigationBasicItemComponent } from './components/basic/basic.component';
import { OpencopsHorizontalNavigationBranchItemComponent } from './components/branch/branch.component';
import { OpencopsHorizontalNavigationSpacerItemComponent } from './components/spacer/spacer.component';

@Component({
    selector       : 'opencops-horizontal-navigation',
    templateUrl    : './horizontal.component.html',
    styleUrls      : ['./horizontal.component.scss'],
    animations     : opencopsAnimations,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'opencopsHorizontalNavigation',
    standalone     : true,
    imports        : [NgFor, NgIf, OpencopsHorizontalNavigationBasicItemComponent, OpencopsHorizontalNavigationBranchItemComponent, OpencopsHorizontalNavigationSpacerItemComponent],
})
export class OpencopsHorizontalNavigationComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() name: string = this._opencopsUtilsService.randomId();
    @Input() navigation: OpencopsNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _opencopsNavigationService: OpencopsNavigationService,
        private _opencopsUtilsService: OpencopsUtilsService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        // Navigation
        if ( 'navigation' in changes )
        {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Make sure the name input is not an empty string
        if ( this.name === '' )
        {
            this.name = this._opencopsUtilsService.randomId();
        }

        // Register the navigation component
        this._opencopsNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Deregister the navigation component from the registry
        this._opencopsNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void
    {
        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
