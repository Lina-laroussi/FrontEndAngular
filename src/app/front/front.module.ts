import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { ListCategorieComponent } from './components/list-categorie/list-categorie.component';
import { ListLivresComponent } from './components/list-livres/list-livres.component';
import { LivreDetailsComponent } from './components/livre-details/livre-details.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { DemandeEmpruntComponent } from './components/demande-emprunt/demande-emprunt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LivreComponent } from './components/livre/livre.component';
import { ListEmpruntsLivresComponent } from './components/list-emprunts-livres/list-emprunts-livres.component';
import { MsgErrorSuccessComponent } from './components/msg-error-success/msg-error-success.component';

@NgModule({
  declarations: [
    AccueilFrontComponent,
    ListCategorieComponent,
    ListLivresComponent,
    LivreDetailsComponent,
    DemandeEmpruntComponent,
    LivreComponent,
    ListEmpruntsLivresComponent,
    MsgErrorSuccessComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ]
})
export class FrontModule {
  constructor() {
    registerLocaleData(fr.default);
  }
 }
