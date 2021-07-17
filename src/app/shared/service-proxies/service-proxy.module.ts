import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';

import * as ApiServiceProxies from './service-proxies';
import * as SSOApiServiceProxies from './sso-service-proxies';
import * as SysApiServiceProxies from './sys-service-proxies';

import { Interceptor } from '@core/models/interceptor';

@NgModule({
    providers: [
        ApiServiceProxies.CategoryServiceProxy,
        ApiServiceProxies.PostServiceProxy,
        //sso
        SSOApiServiceProxies.SSOUserServiceProxy,
        SSOApiServiceProxies.SSOTokenAuthServiceProxy,
        //sys
        SysApiServiceProxies.SysCategoryServiceProxy,
        SysApiServiceProxies.SysCategoryClientServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
