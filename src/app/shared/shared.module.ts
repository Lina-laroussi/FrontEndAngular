import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { httpInterceptorProviders } from './interceptors';
import { PaginationDirective } from './directives/pagination.directive';
import { SpinnerModalComponent } from './components/spinner-modal/spinner-modal.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    PaginationDirective,
    HeaderComponent,
    FooterComponent,
    SpinnerModalComponent,
    AlertComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    httpInterceptorProviders
],
  exports:[
    HeaderComponent,
    FooterComponent,
    PaginationDirective,
    SpinnerModalComponent,
    AlertComponent,


  ]
})
export class SharedModule { }
