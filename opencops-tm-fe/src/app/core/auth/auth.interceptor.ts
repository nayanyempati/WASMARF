import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, Observable, of, throwError } from 'rxjs';

/**
 * Intercept
 *
 * @param req
 * @param next
 */

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
   
   


    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if (authService.AccessToken && !AuthUtils.isTokenExpired(authService.AccessToken)) {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.AccessToken),
        });
    }

    // Response
    const errorMessages: string[] = [];
    return next(newReq).pipe(
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // Sign out
                authService.signOut();

                // Reload the app
                location.reload();
            }

            if (error instanceof HttpErrorResponse && error.status === 400) {
                
                if (error && error.error && error.error.errors) {
                    for (const key in error.error.errors) {
                        if (error.error.errors.hasOwnProperty(key)) {
                            errorMessages.push(error.error.errors[key][0]);
                        }
                    }
                    
                                        
                }
            }

            return throwError(error);
        }),
    );
};
