import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddbiblioComponent} from './components/addbiblio/addbiblio.component';
import {UpdatebiblioComponent} from './components/updatebiblio/updatebiblio.component';
import {ListbiblioComponent} from './components/listbiblio/listbiblio.component';


const routes: Routes = [
  
  { path: 'addbiblio', component: AddbiblioComponent },
  { path: 'listbiblio', component: ListbiblioComponent },
  { path: 'updatebiblio/:id', component: UpdatebiblioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliothequeRoutingModule { }
