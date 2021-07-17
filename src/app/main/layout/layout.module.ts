import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CoreModule } from '../../core/core.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule, MatTabsModule, MatButtonModule, MatTooltipModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { FormsModule } from '@angular/forms';
import { MenuHorizontalComponent } from './menu-horizontal/menu-horizontal.component';
import { SharedModule as AppSharedModule } from "@app/shared/shared.module";
import { SidebarComponent } from './sidebar/sidebar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	// suppressScrollX: true
};

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		MenuHorizontalComponent,
		SidebarComponent,
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		MenuHorizontalComponent,
		SidebarComponent,

	],
	providers: [
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		}
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],

	imports: [
		CommonModule,
		RouterModule,
		CoreModule,
		PerfectScrollbarModule,
		NgbModule,
		FormsModule,
		MatProgressBarModule,
		MatTabsModule,
		MatButtonModule,
		MatTooltipModule,
		TranslateModule.forChild(),
		LoadingBarModule,
		AppSharedModule
	]
})
export class LayoutModule {}
