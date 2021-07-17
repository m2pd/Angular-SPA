import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementsComponent } from './managements.component';
import { CategoryComponent } from './components/category/category.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementsComponent,
    children: [
      {
        path: 'test',
        loadChildren: 'app/main/managements/components/test/test.module#TestModule',
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'post',
        component: PostsComponent
      }
    ]
  }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class ManagementsRoutingModule { }
