import { CategoryTechnicalComponent } from './category/category-technical/category-technical.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeUIComponent } from "./home-ui.component";
import { HomeComponent } from "./home/home.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";

const routes: Routes = [
  {
    path: "",
    component: HomeUIComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "post/:id",
        component: PostDetailComponent
      },
      {
        path: "category-technical",
        component: CategoryTechnicalComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeUIRoutingModule {}
