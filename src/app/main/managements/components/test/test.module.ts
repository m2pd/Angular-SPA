import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestComponent } from "./test.component";
import { TestRoutingModule } from "./test-routing.module";
import { TestDialogComponent } from './components/test-dialog/test-dialog.component';
import { TestContentComponent } from './components/test-content/test-content.component';
import { SharedModule as AppSharedModule } from "@app/shared/shared.module";
import { SharedModule as MainSharedModule } from "@app/managements/shared/shared.module";
import { TestTableComponent } from './components/test-table/test-table.component';

@NgModule({
  declarations: [
    TestComponent,
    TestDialogComponent,
    TestContentComponent,
    TestTableComponent
  ],
  imports: [TestRoutingModule,AppSharedModule, MainSharedModule],
  entryComponents: [
    TestDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: []
})
export class TestModule {}
