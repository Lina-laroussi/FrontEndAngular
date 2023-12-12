import { Component , OnInit } from '@angular/core';
import { Evenement } from 'src/app/core/models/Evenement.model';
import { EvenementService } from 'src/app/core/services/EvenementService';
import { Observable } from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute , Router } from '@angular/router';
@Component({
  selector: 'app-updateevenement',
  templateUrl: './updateevenement.component.html',
  styleUrls: ['./updateevenement.component.scss']
})
export class UpdateevenementComponent implements OnInit {
  eventForm!: FormGroup;
  selectedFile!: File;
  nameFile!:string

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  
    constructor(
      
      private fb: FormBuilder,
      private eventService: EvenementService,
      private route: ActivatedRoute,
      private router: Router,
    ) {
      this.eventForm = new FormGroup({
        bibliotheque: new FormControl(),
        idEvenement: new FormControl(),
        nomE: new FormControl(),
        dateDebut: new FormControl(),
        dateFin: new FormControl(),
        lieu: new FormControl(),
        etatEvent: new FormControl(),
        description: new FormControl(),
        image: new FormControl(),

      });
    }
    
  
    ngOnInit(): void {
      this.initForm();
    }
    initForm() {
      const idEvenement = this.route.snapshot.params['id']; // Supposons que l'ID de la bibliothèque soit dans la route
      this.eventService.getEvenementById(idEvenement).subscribe(
        
        (evenement) => {
          const originaldateDebut = new Date(evenement.dateDebut);
        const formatteddateDebut =
        originaldateDebut.getFullYear() +
          '-' +
          ('0' + (originaldateDebut.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + originaldateDebut.getDate()).slice(-2);
          const originaldateFin = new Date(evenement.dateFin);
          const formatteddateFin =
          originaldateFin.getFullYear() +
            '-' +
            ('0' + (originaldateFin.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + originaldateFin.getDate()).slice(-2);

          // Affectez les valeurs de la bibliothèque au formulaire
          this.eventForm = this.fb.group({
            bibliotheque: evenement.bibliotheque,
            idEvenement: evenement.idEvenement,
            nomE: evenement.nomE,
            dateDebut: formatteddateDebut,
            dateFin: formatteddateFin,
            lieu: evenement.lieu,
            etatEvent: evenement.etatEvent,
            description: evenement.description,
            image: evenement.image,

          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de la bibliothèque', error);
        }
      );
    }
    get f() {
      return this.eventForm.controls;
    }
    ModifierEvent() {
      if (this.eventForm.valid) {
        // Vérifiez si le formulaire est valide avant de procéder à la mise à jour
  
        // Récupérez les valeurs du formulaire
        const idEvenement = this.eventForm.get('idEvenement')?.value;
        const eventData = this.eventForm.value;
  
        // Appelez la méthode de mise à jour du service
        this.eventService.updateEvenement(idEvenement, eventData).subscribe(
          (result) => {
            // Gérez la réponse de la mise à jour
            console.log('Evenement mise à jour avec succès', result);

  
            // Réinitialisez le formulaire après la mise à jour
            this.eventForm.reset();
          },
          (error) => {
            // Gérez les erreurs de la mise à jour
            console.error('Erreur lors de la mise à jour de la bibliothèque', error);
          }
        );
      } else {
        // Si le formulaire n'est pas valide, marquez tous les champs comme "touched" pour afficher les messages d'erreur
        Object.keys(this.eventForm.controls).forEach((field) => {
          const control = this.eventForm.get(field);
          if (control) {
            control.markAsTouched({ onlySelf: true });
          }        });
      }
    }
  }
   
  