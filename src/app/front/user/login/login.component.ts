import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from 'src/app/services/user.service';
import { authCodeFlowConfig } from 'src/app/unidorms-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm !:FormGroup;
  type!: 'success' | 'error';
  message!:string | null;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private route:Router,
    private oauthService:OAuthService){

  }
  configurerSingleSignOn(){
 
    /*const authCodeFlowConfig: AuthConfig = {
      issuer: 'http://localhost:8080/auth/relms/UniDorms',
      redirectUri: window.location.origin + 'http://localhost:4200',
      clientId: 'angular-client',
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true, // pour le débogage, à désactiver en production
    };*/
  this.oauthService.configure(authCodeFlowConfig);
  this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  this.oauthService.loadDiscoveryDocumentAndTryLogin();
}
login(){
  this.oauthService.initCodeFlow();
}
  
  ngOnInit(): void {
    this.configurerSingleSignOn();
    this.login();
    /*this.loginForm =this.formBuilder.group({
   
      email : ['',  [Validators.required]],
      password: ['',  [Validators.required]],

      })
      this.userService.getRole();*/
  
  }
  get myControls(){
    return this.loginForm.controls;
 }
  onSubmitForm(){
    /*this.userService.login(this.loginForm.value).subscribe({
      
      next:(response) => {
        let token = response.token;
        localStorage.setItem('Token', token);
        if(this.userService.getRole() == "ADMIN"){
          this.route.navigateByUrl('/admin/accueil');
        }else if(this.userService.getRole() == "ETUDIANT"){
          this.route.navigate(['/front/universite/afficher']);
        }
      },
      error:(error) => {        
          console.log(error);
          this.type = 'error';
          this.message =error.error;


      }
    }
    );*/
  }
 
}
