import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { ListCategorieComponent } from './components/list-categorie/list-categorie.component';
import { ListLivresComponent } from './components/list-livres/list-livres.component';
import { DemandeEmpruntComponent } from './components/demande-emprunt/demande-emprunt.component';
import { ListEmpruntsLivresComponent } from './components/list-emprunts-livres/list-emprunts-livres.component';

const routes: Routes = [
  {path:'accueil' , component:AccueilFrontComponent},
  {path:'listCategory' , component:ListCategorieComponent},
  {path:'listLivres/:idCategory' , component:ListLivresComponent},
  {path:'livreDetails/:idLivre' , component:ListLivresComponent},
  {path:'emprunterLivre/:idLivre' , component:DemandeEmpruntComponent},
  {path:'listEmprunts' , component:ListEmpruntsLivresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
