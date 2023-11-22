import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { ListCategorieComponent } from './components/list-categorie/list-categorie.component';
import { ListLivresComponent } from './components/list-livres/list-livres.component';
import { DemandeEmpruntComponent } from './components/demande-emprunt/demande-emprunt.component';

const routes: Routes = [
  {path:'accueil' , component:AccueilFrontComponent},
  {path:'listCategory' , component:ListCategorieComponent},
  {path:'listLivres/:idCategory' , component:ListLivresComponent},
  {path:'livreDetails/:idLivre' , component:ListLivresComponent},
  {path:'emprunterLivre/:idLivre' , component:DemandeEmpruntComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
