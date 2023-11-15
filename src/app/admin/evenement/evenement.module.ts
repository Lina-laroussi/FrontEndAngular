import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EvenementRoutingModule } from './evenement-routing.module';
import { AddevenementComponent } from './components/addevenement/addevenement.component';
import { UpdateevenementComponent } from './components/updateevenement/updateevenement.component';
import { ListevenementComponent } from './components/listevenement/listevenement.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AddevenementComponent,
    UpdateevenementComponent,
    ListevenementComponent
  ],
  imports: [
    CommonModule,
    EvenementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ]
})
export class EvenementModule { }