import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "app",
        component: AppComponent,
        children: [
          {
            path: "management",
            loadChildren:
              "app/main/managements/managements.module#ManagementsModule", //Lazy load account module
            data: { preload: true },
            canActivate: [AppRouteGuard]
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
