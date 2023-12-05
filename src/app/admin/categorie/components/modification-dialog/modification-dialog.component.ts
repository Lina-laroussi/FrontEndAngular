import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorieService } from '../../../../core/services/categorie.service';
import { Categorie } from '../../../../core/models/categorie.model';

@Component({
  selector: 'app-modification-dialog',
  templateUrl: './modification-dialog.component.html',
  styleUrls: ['./modification-dialog.component.scss']
})
export class ModificationDialogComponent implements OnInit {


  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ModificationDialogComponent>,
    private categorieService:CategorieService,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }

  modificationCategorieForm !: FormGroup
  selectedFile!: File;
  msg !: String;
  error !: String;

  nameFile!:string

  categorie !: Categorie;

  urlImage : string  = 'http://localhost:8080/images' 


  onFileChanged(event: any): void {
    this.selectedFile =  event.target.files[0];
  }


  ngOnInit(): void {

    this.categorieService.getCategorie(this.data.categorieId).subscribe(
      result=>{
        this.categorie = {
          nom: result.nom,
          description : result.description,
          image : result.image
        }
      }
    );

    this.modificationCategorieForm = this.formBuilder.group({
      nom: [null, [Validators.required , Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      image: [null, [Validators.required]],
    })

  }

  
  get f() {
    return this.modificationCategorieForm.controls;
  }



  modifierCategorie(){
   

    const nouveauNom = this.modificationCategorieForm.get('nom')?.value;
    const nouveauDescription = this.modificationCategorieForm.get('description')?.value;
    const nouveauImage = this.selectedFile;

    const nomFinal = nouveauNom !== null ? nouveauNom : this.categorie.nom;
    const descriptionFinal = nouveauDescription !== null ? nouveauDescription : this.categorie.description;

    const defaultImageValue = new File([this.urlImage], this.categorie.image);

    const imageFinal = nouveauImage !== null && nouveauImage !== undefined ? nouveauImage: defaultImageValue

    this.categorieService.modifierCategorie(this.data.categorieId, nomFinal, descriptionFinal,imageFinal).subscribe(
      () => {
        this.msg = "Catégorie modifiée avec succès";
      },
      () => {
        this.error = "Une erreur est survenue lors de la modification de la catégorie";
      }
    );

  }

}
