import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationEnd, NavigationStart, Router, NavigationCancel } from '@angular/router';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
          private readonly _router:Router
        , public  readonly loader: LoadingBarService
        , public  readonly _session:AppSessionService
    ) {
    }
    ngOnInit(): void {
        this._router.events.subscribe(event => {
			if (event instanceof NavigationStart) this.loader.start();
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
				this.loader.complete();
			}
        });
    }
}
