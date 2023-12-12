import { Component , OnInit } from '@angular/core';
import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';
import { BiblioService } from 'src/app/core/services/BiblioService';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute , Router} from '@angular/router';


@Component({
  selector: 'app-updatebiblio',
  templateUrl: './updatebiblio.component.html',
  styleUrls: ['./updatebiblio.component.scss']
})
export class UpdatebiblioComponent implements OnInit {
  biblioForm!: FormGroup;
  selectedFile!: File;
  nameFile!:string

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  
    constructor(
      
      private fb: FormBuilder,
      private biblioService: BiblioService,
      private route: ActivatedRoute,
      private router: Router,
    ) {
      this.biblioForm = new FormGroup({
        idBibliotheque: new FormControl(),
        nomB: new FormControl(),
        email: new FormControl(),
        numTel: new FormControl(),
        horaire: new FormControl(),
        description: new FormControl(),
        imageB: new FormControl(),

      });
    }
    
  
    ngOnInit(): void {
      this.initForm();
    }
    initForm() {
      const idBibliotheque = this.route.snapshot.params['id']; // Supposons que l'ID de la bibliothèque soit dans la route
      this.biblioService.getBibliothequeById(idBibliotheque).subscribe(
        (bibliotheque) => {
          // Affectez les valeurs de la bibliothèque au formulaire
          this.biblioForm = this.fb.group({
            idBibliotheque: bibliotheque.idBibliotheque,
            nomB: bibliotheque.nomB,
            email: bibliotheque.email,
            numTel: bibliotheque.numTel,
            horaire: bibliotheque.horaire,
            description: bibliotheque.description,
            imageB: bibliotheque.imageB,

          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de la bibliothèque', error);
        }
      );
    }
    get f() {
      return this.biblioForm.controls;
    }
    ModifierBiblio() {
      if (this.biblioForm.valid) {
        // Vérifiez si le formulaire est valide avant de procéder à la mise à jour
  
        // Récupérez les valeurs du formulaire
        const idBibliotheque = this.biblioForm.get('idBibliotheque')?.value;
        const biblioData = this.biblioForm.value;
  
        // Appelez la méthode de mise à jour du service
        this.biblioService.updateBibliotheque(idBibliotheque, biblioData).subscribe(
          (result) => {
            // Gérez la réponse de la mise à jour
            console.log('Bibliothèque mise à jour avec succès', result);
            this.router.navigate(['/admin/bibliotheque/listbiblio']);

  
            // Réinitialisez le formulaire après la mise à jour
            this.biblioForm.reset();
          },
          (error) => {
            // Gérez les erreurs de la mise à jour
            console.error('Erreur lors de la mise à jour de la bibliothèque', error);
          }
        );
      } else {
        // Si le formulaire n'est pas valide, marquez tous les champs comme "touched" pour afficher les messages d'erreur
        Object.keys(this.biblioForm.controls).forEach((field) => {
          const control = this.biblioForm.get(field);
          if (control) {
            control.markAsTouched({ onlySelf: true });
          }        });
      }
    }
  }
   
  