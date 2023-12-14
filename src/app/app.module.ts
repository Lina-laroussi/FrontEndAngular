import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientXsrfModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';  
import { APP_INITIALIZER } from '@angular/core';

import { httpInterceptorProviders } from './shared/interceptors';
import { FrontModule } from './front/front.module';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { initializer } from 'src/app-init';




@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FrontModule,
    AdminModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN', // The name of the cookie that contains the CSRF token
      headerName: 'X-XSRF-TOKEN', // The name of the header that will contain the CSRF token
    }),
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    
   
    FullCalendarModule,
    KeycloakAngularModule,
    RouterModule.forRoot([]),
    OAuthModule.forRoot({
      resourceServer: {
       // allowedUrls: ['your-api-endpoint'],
        sendAccessToken: true,
      },
      // other configurations
    }),
   


  ],

  
  providers: [
    httpInterceptorProviders,
      // add this provider
      {
        provide: APP_INITIALIZER,
        useFactory: initializer,
        deps: [KeycloakService],
        multi: true,
      },
],
    bootstrap: [AppComponent]
})
export class AppModule { }
