import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from 'src/app/services/user.service';
import { authCodeFlowConfig } from 'src/app/unidorms-config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  this.oauthService.configure(authCodeFlowConfig);
  this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  this.oauthService.loadDiscoveryDocumentAndTryLogin();
}
login(){
  this.oauthService.initCodeFlow();
}
  
  ngOnInit(): void {
    //this.configurerSingleSignOn();
    //this.login();
  
  }


 
}
