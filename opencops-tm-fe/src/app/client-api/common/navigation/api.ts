import { Injectable } from '@angular/core';
import { OpencopsNavigationItem } from '@opencops/components/navigation';
import { OpencopsMockApiService } from '@opencops/lib/mock-api/client-api.service';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/client-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class NavigationMockApi
{
    private readonly _compactNavigation: OpencopsNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: OpencopsNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: OpencopsNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: OpencopsNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _opencopsMockApiService: OpencopsMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._opencopsMockApiService
            .onGet('api/common/navigation')
            .reply(() =>
            {
                // Fill compact navigation children using the default navigation
                this._compactNavigation.forEach((compactNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) =>
                {
                    this._defaultNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation),
                    },
                ];
            });
    }
}
