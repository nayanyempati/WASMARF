import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { OpencopsLoadingService } from '@opencops/services/loading/loading.service';
import { finalize, Observable, take } from 'rxjs';

export const opencopsLoadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
{
    const opencopsLoadingService = inject(OpencopsLoadingService);
    let handleRequestsAutomatically = false;

    opencopsLoadingService.auto$
        .pipe(take(1))
        .subscribe((value) =>
        {
            handleRequestsAutomatically = value;
        });

    // If the Auto mode is turned off, do nothing
    if ( !handleRequestsAutomatically )
    {
        return next(req);
    }

    // Set the loading status to true
    opencopsLoadingService._setLoadingStatus(true, req.url);

    return next(req).pipe(
        finalize(() =>
        {
            // Set the status to false if there are any errors or the request is completed
            opencopsLoadingService._setLoadingStatus(false, req.url);
        }));
};
