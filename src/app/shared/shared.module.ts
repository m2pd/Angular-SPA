import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { CoreModule } from '@core/core.module';

@NgModule({
    imports: [
        CommonModule,
        AbpModule,
        RouterModule,
        CoreModule
    ],
    declarations: [
    ],
    entryComponents: [
    ],
    exports: [
        CoreModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppAuthService,
                AppRouteGuard,
            ]
        }
    }
}
