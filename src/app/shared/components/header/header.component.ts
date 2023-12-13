import { Component } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from 'src/app/services/user.service';
import { authCodeFlowConfig } from 'src/app/unidorms-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(private router:Router,private route : ActivatedRoute,
    private userService:UserService,
    private oauthService:OAuthService){
    
  }


  shouldApplyClass(): boolean {
    // Par exemple, basé sur la route
    return this.router.url.startsWith('/front')  ;

  }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  // Vérifie si la route actuelle appartient à la partie front-end
  isFrontRoute(): boolean {
    return this.router.url.startsWith('/front');
  }

  isSpecificRoute(): boolean {
    return this.router.url !== "/front/register" && this.router.url !== "/front/login" && this.router.url !== "/front/updateProfile" && this.router.url !== "/front/reclamation/mesRec";
  }
  logout(): void {
    /*this.userService.logout().subscribe(
      () => {
        // Handle successful logout
        localStorage.removeItem('Token')

        window.location.href = '/front/login'; // Redirect to the login page
      },

      (error) => {
       // window.location.href = '/front/login'; // Redirect to the login page
      }    
      );*/
      this.userService.logoutk();
  }
  isAuthenticated():boolean{
    return this.userService.isAUthenticated();
  }
  configurerSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  login(){
    this.userService.login();
  }
}
