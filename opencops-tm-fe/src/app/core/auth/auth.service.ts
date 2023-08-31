import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/server-api/account/account.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _accountService:AccountService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set AccessToken(token: string)
    {
        sessionStorage.setItem('AccessToken', token);
    }

    get AccessToken(): string
    {
        return sessionStorage.getItem('AccessToken') ?? '';
    }

    signOut(){
        sessionStorage.clear();
    }
  
    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.AccessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.AccessToken) )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this._accountService.Token()
    }
}
