import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontRoutingModule } from './front-routing.module';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';  


@NgModule({
  declarations: [
    AccueilFrontComponent,
    CalendrierComponent,
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FullCalendarModule,
    RouterModule,

  ]
})
export class FrontModule { }
