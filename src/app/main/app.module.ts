import { NgModule, Injector } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JsonpModule } from "@angular/http";
import { HttpClientModule, HttpResponse } from "@angular/common/http";

import { ModalModule, BsDatepickerModule } from "ngx-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AbpModule } from "@abp/abp.module";

import { ServiceProxyModule } from "@shared/service-proxies/service-proxy.module";
import { SharedModule } from "@shared/shared.module";
import { LayoutModule } from "./layout/layout.module";
import { LazyLoadImagesModule } from "ngx-lazy-load-images";

import { CoreModule } from "@core/core.module";
import { HomeUIModule } from "./home-ui/home-ui.module";
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [AppComponent, PostDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),

    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    LayoutModule,
    CoreModule,
    LazyLoadImagesModule,
    HomeUIModule
  ],
  providers: []
})
export class AppModule {
  constructor(public injector: Injector) {}
}
