import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { TestContentComponent } from './components/test-content/test-content.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { TestDialogComponent } from './components/test-dialog/test-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,

    children: [
      {
        path: 'content',
        component: TestContentComponent
      },
      {
        path: 'dialog',
        component: TestDialogComponent
      },
      {
        path: 'table',
        component: TestTableComponent
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TestRoutingModule { }
