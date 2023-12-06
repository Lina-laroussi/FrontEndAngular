import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PageAccueilComponent } from './components/page-accueil/page-accueil.component';


@NgModule({
  declarations: [
    PageAccueilComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
  ]
})
export class AdminModule { }
