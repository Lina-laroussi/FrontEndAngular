import { Component , Inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BiblioService } from 'src/app/core/services/BiblioService';
import { Observable } from 'rxjs';
import { Livre } from 'src/app/core/models/livre.model';

@Component({
  selector: 'app-ajout-livre',
  templateUrl: './ajout-livre.component.html',
  styleUrls: ['./ajout-livre.component.scss']
})
export class AjoutLivreComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<AjoutLivreComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any , private biblioService:BiblioService){

  }

  livreList !: Observable<Livre[]>

  ajoutLivreForm !: FormGroup

  msg !: string;
  error !: string;


  ngOnInit(): void {

    this.livreList = this.biblioService.getAllLivres();


  
    this.ajoutLivreForm = this.formBuilder.group({
      livre: [null, [Validators.required , Validators.minLength(2)]],
    
    })

    
  }


  ajouterLivre(){
    console.log(this.ajoutLivreForm.value)
     this.biblioService.ajouterLivreBiblio(this.ajoutLivreForm.get('livre')?.value,this.data.bibId).subscribe(
      () => {
        this.msg = "Livre ajouté avec succès";
      },
      () => {
        this.error = "Une erreur est survenue lors de l'ajout du livre";
      }
     )
  }


}
