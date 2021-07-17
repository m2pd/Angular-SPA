import { Injectable } from '@angular/core';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
import * as _ from 'lodash';
import { MenuConfigService } from '@core/services/menu-config.service';
import { SSOUserServiceProxy } from '@shared/service-proxies/sso-service-proxies';
// import { MenuServiceProxy } from '@shared/service-proxies/service-proxies';

@Injectable()
export class AppSessionService {

    private _user: any;
    private _baseUrl: string = '';

    constructor(
        private _userServiceProxy: SSOUserServiceProxy,
        private _tokenAuth: TokenService,
        private _menuConfigService: MenuConfigService,
        private _utilsService: UtilsService
    ) {
        this._baseUrl = AppConsts.appBaseHref;
    }

    get user() {
        return this._user;
    }

    get userId() {
        return this._user ? this._user.id : null;
    }

    get tenant() {
        return this._user ? this._user.tenant : null;
    }


    init(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            var valueAuthToken = new UtilsService().getCookieValue(AppConsts.authorization.abpAuthToken);

            if (!valueAuthToken || valueAuthToken == '') {
                resolve(true);
            }

            else {
                this._userServiceProxy.getCurrentUser().toPromise().then((result1: any) => {

                    if (result1 && result1.id) {
                        this._user = result1;
                    }
                    else this._user = null;

                    resolve(true);

                }, (err) => {
                    reject(err);
                });
            }
        });
    }

    // changeTenantIfNeeded(tenant): boolean {
    //     if (this.isCurrentTenant(tenant.id)) {
    //         return false;
    //     }
    //     let option = {
    //         id: tenant.id,
    //         name: tenant.name
    //     }
    //     this._SSOServiceProxy.joinTenant(option).subscribe(res => {

    //         var tokenExpireDate = (new Date(new Date().getTime() + 1000 * 50000000));

    //         this._utilsService.setCookieValue(
    //             AppConsts.authorization.encrptedAuthTokenName,
    //             res.encryptedAccessToken,
    //             tokenExpireDate,
    //             abp.appPath
    //         );

    //         this._tokenAuth.setToken(res.accessToken)
    //         abp.multiTenancy.setTenantIdCookie(tenant.id);
    //         location.replace(this._baseUrl);
    //         return true;
    //     });
    // }

    destroy(): void {
        this._tokenAuth.clearToken();
        this._user = null;
        location.reload();
    }

    private isCurrentTenant(tenantId?: number) {
        if (!tenantId && this.tenant) {
            return false;
        } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }

        return true;
    }
}
