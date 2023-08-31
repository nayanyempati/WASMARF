import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(  private _titleService: Title,
        private _router: Router,
        )
    {
        this.setTitle();
    }

    setTitle(){
        this._router.events
                .pipe(
                    filter((event) => event instanceof NavigationEnd),
                    map(() => {
                        let route: ActivatedRoute = this._router.routerState.root;
                        let routeTitle = '';
                        while (route!.firstChild) {
                            route = route.firstChild;
                        }
                        if (route.snapshot.data['title']) {
                            routeTitle = route!.snapshot.data['title'];
                        }
                        return routeTitle;
                    })
                )
                .subscribe((title: string) => {
                    if (title) {
                        this._titleService.setTitle(`${title} - WASMARF` );
                    }
                });
    }
}
