import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { AccueilFrontComponent } from './components/accueil-front/accueil-front.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LogoutGuard } from '../shared/guards/logout..guard';
import { ListCategorieComponent } from './components/list-categorie/list-categorie.component';
import { ListLivresComponent } from './components/list-livres/list-livres.component';
import { DemandeEmpruntComponent } from './components/demande-emprunt/demande-emprunt.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { DepartementListComponent } from './departement/departement-list/departement-list.component';
import { UniversiteListComponent } from './universite/universite-list/universite-list.component';
import { BiblioComponent } from './components/biblio/biblio.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [AuthGuard] },
  { path: 'reclamation', loadChildren: () => import('./reclamation/reclamation.module').then(m => m.ReclamationModule),canActivate: [AuthGuard] },
  {path:'accueil' , component:AccueilFrontComponent},
  {path:'listCategory' , component:ListCategorieComponent},
  {path:'listLivres/:idCategory' , component:ListLivresComponent,canActivate: [AuthGuard]},
  {path:'livreDetails/:idLivre' , component:ListLivresComponent,canActivate: [AuthGuard]},
  {path:'emprunterLivre/:idLivre' , component:DemandeEmpruntComponent,canActivate: [AuthGuard]},
  { path: '', loadChildren: () => import('./universite/universite.module').then(m => m.UniversiteModule)},
  { path: '', loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule)},
  { path: 'foyer', loadChildren: () => import('./foyer/foyer.module').then(m => m.FoyerModule)},
  { path: 'bloc', loadChildren: () => import('./bloc/bloc.module').then(m => m.BlocModule)},
  {path:'reservation', loadChildren: () => import('../front/reservation/reservation.module').then(m => m.ReservationModule)},


  {path:'Bib/:idFoyer' , component:BiblioComponent},
  {path: 'calendrier/:idBibliotheque', component: CalendrierComponent}, 
]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
