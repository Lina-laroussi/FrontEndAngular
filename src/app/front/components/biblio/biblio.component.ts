import { Component, OnInit } from '@angular/core';
import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';
import { BiblioService } from 'src/app/core/services/BiblioService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biblio',
  templateUrl: './biblio.component.html',
  styleUrls: ['./biblio.component.scss']
})
export class BiblioComponent implements OnInit {
  constructor(private biblioService: BiblioService, private route: ActivatedRoute, private router: Router) {}

  idFoyer!: number;
  bibliotheque!: Bibliotheque;
  urlImage: string = 'http://localhost:8080/images_biblios';

  navigateToCalendrier() {
    if (this.bibliotheque && this.bibliotheque.idBibliotheque) {
      this.router.navigate(['/front/calendrier', this.bibliotheque.idBibliotheque]);
    } else {
      console.error('La bibliothèque ou son ID n\'est pas défini.');
      // Ajoutez un comportement par défaut ou une redirection vers une page d'erreur
    }
  }
  ngOnInit(): void {
    this.idFoyer = this.route.snapshot.params['idFoyer'];

    this.biblioService.getBibliothequeByFoyer(this.idFoyer).subscribe(
      (bibliotheque: Bibliotheque) => {
        this.bibliotheque = bibliotheque;

        // Maintenant, this.bibliotheque contient les détails de la bibliothèque,
        // y compris l'ID que vous pouvez utiliser.
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors du chargement des détails de la bibliothèque :", error);
      }
    );
  }
}
