import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BibliothequeRoutingModule } from './bibliotheque-routing.module';
import { AddbiblioComponent } from './components/addbiblio/addbiblio.component';
import { UpdatebiblioComponent } from './components/updatebiblio/updatebiblio.component';
import { ListbiblioComponent } from './components/listbiblio/listbiblio.component';
import { HttpClientModule } from '@angular/common/http';
import { AjoutLivreComponent } from './components/ajout-livre/ajout-livre.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MsgerreurComponent } from './components/msgerreur/msgerreur.component';


@NgModule({
  declarations: [
    AddbiblioComponent,
    UpdatebiblioComponent,
    ListbiblioComponent,
    AjoutLivreComponent,
    MsgerreurComponent,
 
  ],
  imports: [
    CommonModule,
    BibliothequeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class BibliothequeModule { }
