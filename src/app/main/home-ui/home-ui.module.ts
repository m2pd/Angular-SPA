// import { SlickCarouselComponent } from './../shared/components/slick-carousel/slick-carousel.component';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  CategoryClientServiceProxy,
  PostClientServiceProxy
} from "@shared/service-proxies/service-proxies";
import { NgImageSliderModule } from "ng-image-slider";
import { NgxGalleryModule } from "ngx-gallery";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

import { HomeUIRoutingModule } from "./home-ui-routing.module";
import { HomeUIComponent } from "./home-ui.component";
import { HomeComponent } from "./home/home.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryPostComponent } from './component/category-post/category-post.component';
import { PostItemComponent } from './component/category-post/post-item/post-item.component';
import { GroupBannerComponent } from './component/group-banner/group-banner.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeUIComponent,
    HeaderComponent,
    PostDetailComponent,
    FooterComponent,
    CategoryPostComponent,
    PostItemComponent,
    GroupBannerComponent,
    // SlickCarouselComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule,
    NgbModule,
    NgxGalleryModule,
    SlickCarouselModule,

    HomeUIRoutingModule
  ],
  entryComponents: [],
  providers: [CategoryClientServiceProxy, PostClientServiceProxy]
})
export class HomeUIModule {}
