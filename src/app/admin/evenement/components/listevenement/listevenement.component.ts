import { Component , OnInit } from '@angular/core';
import { Evenement } from 'src/app/core/models/Evenement.model';
import { EvenementService } from 'src/app/core/services/EvenementService';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-listevenement',
  templateUrl: './listevenement.component.html',
  styleUrls: ['./listevenement.component.scss']
})
export class ListevenementComponent implements OnInit {


  constructor(private EvenementService : EvenementService, private router: Router ){

  }
  navigateToEdit(id: number) {
    this.router.navigate(['/admin/evenement/updateevent', id]);
  }
  navigateToAdd() {
    this.router.navigate(['/admin/evenement/addevent']);
  }


  eventList !: Observable<Evenement[]>
  urlImage : string  = 'http://localhost:8080/images_events' 



   ngOnInit(): void {
     this.eventList =  this.EvenementService.getAllEvents();

   

 
}
supprimerEvenement(id: any): void {
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
  this.EvenementService.deleteEvent(id).subscribe(
    () => {
      console.log('Evenement supprimé avec succès');
      this.EvenementService.getAllEvents();
      // Effectuez toute action supplémentaire après la suppression si nécessaire
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  );
  Swal.fire(
    'Supprimée !',
    'L\'évenement a été supprimé avec succès.',
    'success'
    );
  }
});
}
}