import { SlickCarouselComponent } from './components/slick-carousel/slick-carousel.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { ManagementsComponent } from "./managements.component";
import { ManagementsRoutingModule } from "./managements-routing.module";
import { SharedModule as AppSharedModule } from "@app/shared/shared.module";
import { SharedModule as MainSharedModule } from "./shared/shared.module";
import { CategoryComponent } from "./components/category/category.component";
import { PostsComponent } from "./components/posts/posts.component";
import { HomeComponent } from "@app/home/home.component";

import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    ManagementsComponent,
    CategoryComponent,
    HomeComponent,
    PostsComponent,
    SlickCarouselComponent,
  ],
  imports: [AppSharedModule, MainSharedModule, ManagementsRoutingModule, SlickCarouselModule],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

	providers: []
})
export class ManagementsModule { }
