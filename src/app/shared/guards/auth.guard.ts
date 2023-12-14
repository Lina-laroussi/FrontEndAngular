/*import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import * as jwt from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';*/
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
/*
@Injectable({
    providedIn: 'root'
})

export class AuthGuard {
    
    constructor( private router:Router,private jwtHelper:JwtHelperService) {}  
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token  = localStorage.getItem('Token') as string
        console.log(!this.jwtHelper.isTokenExpired(token));
        if(!this.jwtHelper.isTokenExpired(token) || token){  
            return true;
        }else{
            localStorage.removeItem('Token');
            this.router.navigate(['/front/login']);
            return false;
        }
    }
}*/


@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
        console.log(window.location.origin + state.url);

      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    if (requiredRoles.every((role) => this.roles.includes(role))) {
      return true;
    } else {
      // redirect to error page if the user doesn't have the nessecairy  role to access
      // we will define this routes in a bit
      this.router.navigate(['/front/accueil']);
      return false;
    }
  }
}