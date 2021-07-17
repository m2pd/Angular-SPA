import { Component, OnInit } from '@angular/core';
import {
	Router
} from '@angular/router';
import { AppSessionService } from '@shared/session/app-session.service';
import * as _ from 'lodash';
import { MenuConfigService } from '@core/services/menu-config.service';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
// import { SSOServiceProxy } from '@shared/service-proxies/sso-service-proxies';

@Component({
	selector: 'm-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

	urlLogin = null;
	urlLogo = null;

	constructor(
		private readonly _router: Router,
		private readonly _utilsService:UtilsService, 
		public  readonly _menuConfig:MenuConfigService,
		public  readonly _session:AppSessionService
	) {
		this.urlLogin = AppConsts.loginUrl;
		this.urlLogo = AppConsts.tenantProfile.logo;
	}

	ngOnInit() {
 
	}

	// changeTenant(tenant) {
	// 	this._session.changeTenantIfNeeded(tenant);
	// }

	logout() {
		this._utilsService.deleteCookie(AppConsts.authorization.encrptedAuthTokenName, abp.appPath);
		this._session.destroy();
	}
}
