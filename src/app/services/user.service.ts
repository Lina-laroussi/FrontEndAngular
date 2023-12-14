import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KeycloakService } from 'keycloak-angular';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../unidorms-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type': 'application/json'})}
  url ="http://localhost:8080/"
  username: string | undefined;
  email: string | undefined;
  constructor(private httpClient: HttpClient,
    private jwtHelper:JwtHelperService,
    private keycloakService: KeycloakService,
    private oauthService:OAuthService) {


  }
  getUserByEmprunt(id:any) : Observable<any> {
    return this.httpClient.get<any>(`${this.url}utilisateurs/emprunt/${id}`);
  }
  getUsers():Observable<any[]>{
    return this.httpClient.get<any[]>(this.url+"utilisateurs")
  }
  getEtudiantNonArchive(role:string,etat:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.url}utilisateurs/getByRoleEtat?role=${role}&etat=${etat}`)
  }
  register(data:any):Observable<any>{
    return this.httpClient.post<any>(this.url+"utilisateurs/register",data)
  }
  configurerSingleSignOn(){
 
      const authCodeFlowConfig: AuthConfig = {
        issuer: 'http://localhost:8080/auth/relms/UniDorms',
        redirectUri: window.location.origin + 'http://localhost:4200',
        clientId: 'angular-client',
        responseType: 'code',
        scope: 'openid profile email',
        showDebugInformation: true, // pour le débogage, à désactiver en production
      };
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  login(){
    this.oauthService.initCodeFlow();
    //return this.httpClient.post<any>(this.url+"utilisateurs/login",data,this.httpOptions)
  }
    logout():Observable<any>{
    return this.httpClient.put<any>(this.url+"utilisateurs/logout",{})

  }
  logink(): void {
    //this.keycloakService.logout('http://localhost:4200'); // Replace with your redirect URL
  }

  logoutk(): void {
   this.keycloakService.logout();
   console.log("logout");
   //this.oauthService.logOut();
  }
  async doLogin() {
    await this.keycloakService.login();
  }

  async doLogout() {
    await this.keycloakService.logout();
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  getUser(id:any):Observable<any>{
    return this.httpClient.get<any>(`${this.url}utilisateurs/get/${id}`,this.httpOptions);
  }
  getUserByEmail(email:any):Observable<any>{
    return this.httpClient.get<any>(`${this.url}utilisateurs/getByEmail?email=${email}`);
  }
  confirmAccount(token: string): Observable<any> {
     return this.httpClient.get(`${this.url}utilisateurs/confirm?token=${token}`, { responseType: 'text' });
  }
  updateUser(id:any,data:any):Observable<any>{
    return this.httpClient.put<any>(`${this.url}utilisateurs/edit/${id}`,data);
  }
  changerEtat(id:any,etat:any):Observable<any>{
    return this.httpClient.put<any>(`${this.url}utilisateurs/etat/${id}`,etat);
  }

  getUserEmail():string{
    const token = localStorage.getItem('Token')as string
    const tokenPayload : any= jwt.jwtDecode(token) 


         return tokenPayload.sub
   }
   getRole(){
  console.log(this.keycloakService.getUserRoles());
   return this.keycloakService.getUserRoles()[0];
   }
   getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.keycloakService
        .loadUserProfile()
        .then((userProfile: any) => {
          if (userProfile) {
            resolve(userProfile);
          } else {
            reject('User profile not available');
          }
        })
        .catch((error: any) => {
          reject(`Error loading user profile: ${error}`);
        });
    });
  }



   isAUthenticated():boolean{
    //const token  = localStorage.getItem('Token') as string
    //return !this.jwtHelper.isTokenExpired(token)
    //console.log(this.oauthService.hasValidAccessToken());
    console.log( this.keycloakService.isLoggedIn()
    );
    return this.keycloakService.isLoggedIn();

    //return this.oauthService.hasValidAccessToken();
    

   }
   isAUthenticatedk():boolean{
    return this.token;
   }
   get token(){
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ?claims  : null;
   }
}
