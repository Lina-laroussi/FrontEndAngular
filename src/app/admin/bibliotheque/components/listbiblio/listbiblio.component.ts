import { Component , OnInit } from '@angular/core';
import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';
import { BiblioService } from 'src/app/core/services/BiblioService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AjoutLivreComponent } from '../ajout-livre/ajout-livre.component';



@Component({
  selector: 'app-listbiblio',
  templateUrl: './listbiblio.component.html',
  styleUrls: ['./listbiblio.component.scss']
})
export class ListbiblioComponent implements OnInit {


  constructor(private BiblioService : BiblioService , private router: Router ,  private dialog:MatDialog ){

  }
 
  biblioList !: Observable<Bibliotheque[]>
  urlImage : string  = 'http://localhost:8080/images_biblios'
  searchTerm: string = '';
 


   ngOnInit(): void {
     this.biblioList =  this.BiblioService.getAllBiblios();
   
}
navigateToEdit(id: number) {
  this.router.navigate(['/admin/bibliotheque/updatebiblio', id]);
}
navigateToAdd(id: number) {
  this.router.navigate(['/admin/bibliotheque/addbiblio', id]);
}
supprimerBiblio(idBibliotheque: any): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Cette action est irréversible !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Oui, supprimer !'
  }).then((result) => {
    // Si l'utilisateur a confirmé la suppression
    if (result.isConfirmed) {
  this.BiblioService.deleteBiblio(idBibliotheque).subscribe(
    () => {
      console.log('Bibliotheque supprimée avec succès');
      this.BiblioService.getAllBiblios();
      // Effectuez toute action supplémentaire après la suppression si nécessaire
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  );
  Swal.fire(
    'Supprimée !',
    'La Bibliotheque a été supprimée avec succès.',
    'success'
    );
  }
});
}

refreshBiblios(): void {
  this.biblioList = this.BiblioService.getAllBiblios();
}
searchBiblios(): void {
  if (this.searchTerm.trim() !== '') {
    this.biblioList = this.BiblioService.getAllBiblios().pipe(
      map((biblios: Bibliotheque[]) =>
        biblios.filter(biblio => biblio.nomB.toLowerCase().includes(this.searchTerm.toLowerCase()))
      )
    );
  } else {
    this.refreshBiblios();
  }
}

clearSearch(): void {
  this.searchTerm = '';
  this.refreshBiblios();
}


   openModalAjout(id : any){
    const dialogRef = this.dialog.open(AjoutLivreComponent, {
      width: '350px',
      height:'250px' ,
      data: { title:"Ajouter livre" , bibId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });

   } 




}