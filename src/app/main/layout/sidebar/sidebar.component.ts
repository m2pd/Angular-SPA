import { Component, OnInit } from '@angular/core';
import { MenuConfigService } from '@core/services/menu-config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'm-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  _opened: boolean = false;
 
  constructor(
    private readonly _router:Router,
    public  readonly _menuConfig:MenuConfigService){

  }
  ngOnInit(): void {
    this._menuConfig.$onShowMenuMobile.subscribe(res => this._opened = !this._opened);
  }

  gotoView(menu){
    if(menu.listSub && menu.listSub.length > 0 || !menu.url) return;
    this._router.navigateByUrl(menu.url);
  }
}
