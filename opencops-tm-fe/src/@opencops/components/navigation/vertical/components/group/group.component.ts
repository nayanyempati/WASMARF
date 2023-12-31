import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpencopsNavigationService } from '@opencops/components/navigation/navigation.service';
import { OpencopsNavigationItem } from '@opencops/components/navigation/navigation.types';
import { OpencopsVerticalNavigationBasicItemComponent } from '@opencops/components/navigation/vertical/components/basic/basic.component';
import { OpencopsVerticalNavigationCollapsableItemComponent } from '@opencops/components/navigation/vertical/components/collapsable/collapsable.component';
import { OpencopsVerticalNavigationDividerItemComponent } from '@opencops/components/navigation/vertical/components/divider/divider.component';
import { OpencopsVerticalNavigationSpacerItemComponent } from '@opencops/components/navigation/vertical/components/spacer/spacer.component';
import { OpencopsVerticalNavigationComponent } from '@opencops/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'opencops-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgClass, NgIf, MatIconModule, NgFor, OpencopsVerticalNavigationBasicItemComponent, OpencopsVerticalNavigationCollapsableItemComponent, OpencopsVerticalNavigationDividerItemComponent, forwardRef(() => OpencopsVerticalNavigationGroupItemComponent), OpencopsVerticalNavigationSpacerItemComponent],
})
export class OpencopsVerticalNavigationGroupItemComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() autoCollapse: boolean;
    @Input() item: OpencopsNavigationItem;
    @Input() name: string;

    private _opencopsVerticalNavigationComponent: OpencopsVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _opencopsNavigationService: OpencopsNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._opencopsVerticalNavigationComponent = this._opencopsNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._opencopsVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(() =>
        {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
