import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OpencopsNavigationService } from '@opencops/components/navigation/navigation.service';
import { OpencopsNavigationItem } from '@opencops/components/navigation/navigation.types';
import { OpencopsVerticalNavigationComponent } from '@opencops/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'opencops-vertical-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgClass],
})
export class OpencopsVerticalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
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
}
