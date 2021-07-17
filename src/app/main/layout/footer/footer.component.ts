import { Component } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';

@Component({
	selector: 'm-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	tenantProfile = null;

	constructor(){
		this.tenantProfile = AppConsts.tenantProfile;
	}
}
