import { Component, OnInit, Injector, HostBinding, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AuthNoticeService } from '@core/auth/auth-notice.service';
import { TranslationService } from '@core/services/translation.service';

// import { locale as enLang } from './i18n/en';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: [
        './account.component.less'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent extends AppComponentBase implements OnInit, OnDestroy {
    constructor(
        private injector: Injector,
        public authNoticeService: AuthNoticeService,
        private translationService: TranslationService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
