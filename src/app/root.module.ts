import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { PlatformLocation, registerLocaleData } from '@angular/common';

import { AbpModule } from '@abp/abp.module';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { RootRoutingModule } from './root-routing.module';

import { AppConsts } from '@shared/AppConsts';
import { API_BASE_URL } from '@shared/service-proxies/service-proxies';

import { RootComponent } from './root.component';
import { AppPreBootstrap } from '../AppPreBootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import * as _ from 'lodash';
import { CoreModule } from '@core/core.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MatProgressSpinnerModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Interceptor } from '@core/models/interceptor';
import { AppSessionService } from '@shared/session/app-session.service';
import { SharedModule as MainSharedModule } from './main/shared/shared.module'
import { SSO_API_BASE_URL } from '@shared/service-proxies/sso-service-proxies';
import { SYS_API_BASE_URL } from '@shared/service-proxies/sys-service-proxies';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

export function appInitializerFactory(injector: Injector, platformLocation: PlatformLocation) {

    return () => {

        return new Promise<boolean>((resolve, reject) => {

            AppConsts.appBaseHref = getBaseHref(platformLocation);
            const appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;
            AppPreBootstrap.run(appBaseUrl, () => {

                const appSessionService: AppSessionService = injector.get(AppSessionService);

                appSessionService.init().then(
                    (result) => {
                        resolve(result);
                    }
                );
            });
        })
    }

}

export function convertAbpLocaleToAngularLocale(locale: string): string {
    if (!AppConsts.localeMappings) {
        return locale;
    }

    const localeMapings = _.filter(AppConsts.localeMappings, { from: locale });
    if (localeMapings && localeMapings.length) {
        return localeMapings[0]['to'];
    }

    return locale;
}

export function shouldLoadLocale(): boolean {
    return abp.localization.currentLanguage.name && abp.localization.currentLanguage.name !== 'en-US';
}

export function getRemoteServiceBaseUrl(): string {
    return AppConsts.remoteServiceBaseUrl;
}

export function getSSORemoteServiceBaseUrl(): string {
    return AppConsts.ssoRemoteServiceBaseUrl;
}

export function getSysRemoteServiceBaseUrl(): string {
    return AppConsts.sysRemoteServiceBaseUrl;
}


export function getCurrentLanguage(): string {
    return "en-US";
    // return abp.localization.currentLanguage.name;
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule.forRoot(),
        ModalModule.forRoot(),
        AbpModule,
        ServiceProxyModule,
        RootRoutingModule,
        HttpClientModule,
        CoreModule.forRoot(),
        OverlayModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        MainSharedModule
    ],
    declarations: [
        RootComponent,
    ],
    providers: [
        { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
        { provide: SSO_API_BASE_URL, useFactory: getSSORemoteServiceBaseUrl },
        { provide: SYS_API_BASE_URL, useFactory: getSysRemoteServiceBaseUrl },
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [Injector, PlatformLocation],
            multi: true
        },
        {
            provide: LOCALE_ID,
            useValue: "en-US",
        },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        }
    ],
    bootstrap: [RootComponent]
})

export class RootModule {

}

export function getBaseHref(platformLocation: PlatformLocation): string {
    const baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

function getDocumentOrigin() {
    if (!document.location.origin) {
        return document.location.protocol + '//' +
            document.location.hostname + (document.location.port ? ':' + document.location.port : '');
    }

    return document.location.origin;
}
