import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LivreService } from '../../../../core/services/livre.service';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/core/models/categorie.model';


@Component({
  selector: 'app-modification-dialog-livre',
  templateUrl: './modification-dialog-livre.component.html',
  styleUrls: ['./modification-dialog-livre.component.scss']
})
export class ModificationDialogLivreComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ModificationDialogLivreComponent>,
    private livreService:LivreService, private categorieService:CategorieService,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }


  modificationLivreForm !: FormGroup
  selectedFile!: File;
  msg !: String;
  error !: String;

  nameFile!:string


  livre !: any;


  categorie !: any;


  urlImage : string  = 'http://localhost:8080/images_livres' 

  categorieList !: Observable<Categorie[]>


  onFileChanged(event: any): void {
    this.selectedFile =  event.target.files[0];
  }


  ngOnInit(): void {


    this.categorieList = this.categorieService.getAllCategorie();


    this.categorieService.getCategorie(this.data.categorieId).subscribe(
      result=>{
        this.categorie = result
      }
    )

    console.log(this.selectedFile)


    this.livreService.getLivre(this.data.livreId).subscribe(
      result=>{
        const originalDate = new Date(result.dateDePublication);
        const formattedDate =
          originalDate.getFullYear() +
          '-' +
          ('0' + (originalDate.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + originalDate.getDate()).slice(-2);
       
        this.livre = {
          titre: result.titre,
          description : result.description,
          nomAuteur:result.nomAuteur,
          nbPages:result.nbPages,
          dateDePublication: formattedDate,
          image : result.image,
          disponibilite : result.disponibilite
        }
        console.log(this.livre)

      }
    );

    this.modificationLivreForm = this.formBuilder.group({
      titre: [null, [Validators.required , Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      nomAuteur: [null, [Validators.required, Validators.minLength(2)]],
      nbPages: [null, [Validators.required]],
      dateDePublication: [null, [Validators.required]],
      categorie : [null , [Validators.required]],
      disponibilite : [null , [Validators.required]],
      image: [null, [Validators.required]],
    })


  }


  get f() {
    return this.modificationLivreForm.controls;
  }


  modifierLivre(){

    const nouveauTitre = this.modificationLivreForm.get('titre')?.value;
    const nouveauDescription = this.modificationLivreForm.get('description')?.value;
    const nouveauAuteur = this.modificationLivreForm.get('nomAuteur')?.value;
    const nouveauPages = this.modificationLivreForm.get('nbPages')?.value;
    const nouveauDate = this.modificationLivreForm.get('dateDePublication')?.value;
    const nouveauCategorie = this.modificationLivreForm.get('categorie')?.value;
    const nouveauDisp = this.modificationLivreForm.get('disponibilite')?.value;
    const nouveauImage = this.selectedFile;

    const titreFinal = nouveauTitre !== null ? nouveauTitre : this.livre.titre;
    const descriptionFinal = nouveauDescription !== null ? nouveauDescription : this.livre.description;
    const auteurFinal = nouveauAuteur !== null ? nouveauAuteur : this.livre.nomAuteur;
    const pagesFinal = nouveauPages !== null ? nouveauPages : this.livre.nbPages;
    const dateFinal = nouveauDate !== null ? nouveauDate : this.livre.dateDePublication;
    const CategorieFinal = nouveauCategorie !== null ? nouveauCategorie : this.data.categorieId;
    const DispFinal = nouveauDisp !== null ? nouveauDisp : this.livre.disponibilite ? 1 : 0;


    const defaultImageValue = new File([this.urlImage], this.livre.image);
    const imageFinal = nouveauImage !== null && nouveauImage !== undefined ? nouveauImage: defaultImageValue


    
    this.livreService.modifierLivre(this.data.livreId,
      titreFinal,
      descriptionFinal,
      auteurFinal,
      pagesFinal,
      dateFinal,
      CategorieFinal,
      DispFinal,
      this.selectedFile).subscribe(
      ()=>{
        this.msg = "Livre modifié avec succées"
          },
     ()=>{
        this.error = "Il ya une erreur qui est survenu"
     }
    )

  

  }


}
