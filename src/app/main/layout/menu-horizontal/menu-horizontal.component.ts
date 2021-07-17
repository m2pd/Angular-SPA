import { Component, OnInit } from '@angular/core';
import { MenuConfigService } from '@core/services/menu-config.service';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, NavigationCancel, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'm-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent implements OnInit {

  isShowMenuMobile = false;
  
  constructor(
      private readonly _router:Router
    , public  readonly _session:AppSessionService
    , public  readonly loader: LoadingBarService
    , public  readonly _menuConfig:MenuConfigService) { }

  ngOnInit() {
    this._menuConfig.setActive(this._router.url);
        
    this._router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event:any) => {
      this._menuConfig.setActive(event.url);
      this._menuConfig.switchMenuMobile();
    });


    this._menuConfig.$onShowMenuMobile.subscribe(res => this.isShowMenuMobile = !this.isShowMenuMobile);
  }

}
