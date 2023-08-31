import { Injectable } from '@angular/core';
import { OpencopsMockApiService } from '@opencops/lib/mock-api/client-api.service';
import { user as userData } from 'app/client-api/common/user/data';
import { assign, cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class UserMockApi
{
    private _user: any = userData;

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
        // @ User - GET
        // -----------------------------------------------------------------------------------------------------
        this._opencopsMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);

        // -----------------------------------------------------------------------------------------------------
        // @ User - PATCH
        // -----------------------------------------------------------------------------------------------------
        this._opencopsMockApiService
            .onPatch('api/common/user')
            .reply(({request}) =>
            {
                // Get the user client-api
                const user = cloneDeep(request.body.user);

                // Update the user client-api
                this._user = assign({}, this._user, user);

                // Return the response
                return [200, cloneDeep(this._user)];
            });
    }
}
