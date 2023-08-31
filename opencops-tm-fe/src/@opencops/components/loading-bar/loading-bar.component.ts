import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OpencopsLoadingService } from '@opencops/services/loading';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'opencops-loading-bar',
    templateUrl  : './loading-bar.component.html',
    styleUrls    : ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'opencopsLoadingBar',
    standalone   : true,
    imports      : [NgIf, MatProgressBarModule],
})
export class OpencopsLoadingBarComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() autoMode: boolean = true;
    mode: 'determinate' | 'indeterminate';
    progress: number = 0;
    show: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _opencopsLoadingService: OpencopsLoadingService)
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
        // Auto mode
        if ( 'autoMode' in changes )
        {
            // Set the auto mode in the service
            this._opencopsLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
        }
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to the service
        this._opencopsLoadingService.mode$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) =>
            {
                this.mode = value;
            });

        this._opencopsLoadingService.progress$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) =>
            {
                this.progress = value;
            });

        this._opencopsLoadingService.show$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((value) =>
            {
                this.show = value;
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
