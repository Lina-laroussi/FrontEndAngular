import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EvenementRoutingModule } from './evenement-routing.module';
import { AddevenementComponent } from './components/addevenement/addevenement.component';
import { UpdateevenementComponent } from './components/updateevenement/updateevenement.component';
import { ListevenementComponent } from './components/listevenement/listevenement.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AddevenementComponent,
    UpdateevenementComponent,
    ListevenementComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    EvenementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule ,
    FullCalendarModule,
    MatDialogModule,
  ]
})
export class EvenementModule { }
