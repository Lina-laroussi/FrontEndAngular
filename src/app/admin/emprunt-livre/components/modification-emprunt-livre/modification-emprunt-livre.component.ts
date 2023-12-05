import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Livre } from 'src/app/core/models/livre.model';
import { EmpruntLivreService } from 'src/app/core/services/empruntLivre.service';
import { LivreService } from 'src/app/core/services/livre.service';

@Component({
  selector: 'app-modification-emprunt-livre',
  templateUrl: './modification-emprunt-livre.component.html',
  styleUrls: ['./modification-emprunt-livre.component.scss']
})
export class ModificationEmpruntLivreComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModificationEmpruntLivreComponent>,
    private empruntLivreService:EmpruntLivreService,  private livreService:LivreService,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }


  emprunt !: any;

  livre ! :any;

  selectedLivreId !: any;

  livreList !: Observable<Livre[]>

  msg!:string
  error!:string

  @ViewChild('modifEmprunt') modifEmpruntForm!: NgForm;

  ngOnInit(): void {


    this.livreList = this.livreService.getAllLivres();

    this.livreService.getLivre(this.data.livreId).subscribe(
      result=>{
        this.livre = result
      }
    )

    this.empruntLivreService.getEmpruntLivre(this.data.empruntId).subscribe(
    
      result=>{
        console.log(result)
        const originalDateDebut = new Date(result.dateDebutEmprunt);
        const originalDateFin = new Date(result.dateFinEmprunt);

        const formattedDateDebut =
          originalDateDebut.getFullYear() +
          '-' +
          ('0' + (originalDateDebut.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + originalDateDebut.getDate()).slice(-2);


        const formattedDateFin =
            originalDateFin.getFullYear() +
            '-' +
            ('0' + (originalDateFin.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + originalDateFin.getDate()).slice(-2);
       
        this.emprunt = {
          dateDebutEmprunt: formattedDateDebut,
          dateFinEmprunt : formattedDateFin,
        }
      }
    );
    
  }


  modifierEmpruntLivre(){

     this.empruntLivreService.modifierEmpruntLivre(this.data.empruntId,
      this.modifEmpruntForm.value.dateDebutEmprunt,
      this.modifEmpruntForm.value.dateFinEmprunt,
      this.modifEmpruntForm.value.livreSelect,
      this.data.livreId).subscribe(
      ()=>{
        this.msg = "Emprunt livre modifié avec succées"        
     },
     ()=>{
          this.error = "Il ya une erreur qui est survenu"
     }
     )
       
  }

}
