import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { AbpModule } from '@abp/abp.module';
import { AccountRoutingModule } from './account-routing.module';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account.component';

import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { SetTokenComponent } from './set-token/set-token.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        JsonpModule,
        AbpModule,
        SharedModule,
        ServiceProxyModule,
        AccountRoutingModule,
        ModalModule.forRoot(),
        TranslateModule.forChild(),
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        NgxErrorsModule
    ],
    declarations: [
        AccountComponent,
        SetTokenComponent,
    ],
    providers: [
    ]
})
export class AccountModule {

}
