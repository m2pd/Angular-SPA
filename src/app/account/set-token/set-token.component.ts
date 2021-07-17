import { Component, OnInit, OnDestroy } from '@angular/core';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AppConsts } from '@shared/AppConsts';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-set-token',
    template: '<div></div>'
})
export class SetTokenComponent implements OnInit, OnDestroy {

  $wacthToken:Subscription;
  
  constructor(        
      public tokenService:TokenService
    , private routeActivate:ActivatedRoute
    , private _utilsService:UtilsService
    , private route: Router
    ){}

  ngOnInit() {
    this.setToken();
  }

  setToken(){
   
    this.$wacthToken = this.routeActivate.fragment.subscribe(token => {

      if(!token){
        this.route.navigate(['app']);
      }
      else{
        var list = token.split('/#');
        var accessToken = list[0];
        var encryptedAccessToken = list[1];

        var tokenExpireDate =  (new Date(new Date().getTime() + 1000 * 50000000)) ;
        this.tokenService.setToken(
            accessToken,
            tokenExpireDate
        );
        
        this._utilsService.setCookieValue(
          AppConsts.authorization.encrptedAuthTokenName,
          encryptedAccessToken,
          tokenExpireDate,
          abp.appPath
        );
        window.location.href = 'app';
      }
    })
  }

  ngOnDestroy(): void {
    if(this.$wacthToken){
      this.$wacthToken.unsubscribe();
    }
  }

}
