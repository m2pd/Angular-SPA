import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule as AppSharedModule } from "@app/shared/shared.module";
// import { OrganizationUserPipe } from './_pipes/organization-user.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, AppSharedModule
  ],
  exports: [
  ],
  providers: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
