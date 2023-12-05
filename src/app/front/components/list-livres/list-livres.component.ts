import { Component , EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Livre } from 'src/app/core/models/livre.model';
import { LivreService } from 'src/app/core/services/livre.service';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { MatDialog } from '@angular/material/dialog';
import { LivreDetailsComponent } from '../livre-details/livre-details.component';

@Component({
  selector: 'app-list-livres',
  templateUrl: './list-livres.component.html',
  styleUrls: ['./list-livres.component.scss']
})
export class ListLivresComponent implements OnInit {

  constructor(private livreService:LivreService , private route:ActivatedRoute , private categorieService:CategorieService,private router:Router,private dialog:MatDialog){

  }


  livreList !: Observable<Livre[]>
  idCategory !: number;

  urlImage : string  = 'http://localhost:8080/images_livres' ;


  category !: any; 
  imageBanniere !: string;


  ngOnInit(): void {
     
    this.idCategory = this.route.snapshot.params['idCategory'];

    this.livreList = this.livreService.getAllLivresByCategory(this.idCategory);

   
    this.category = this.categorieService.getCategorie(this.idCategory).subscribe(
      result =>{
          if(result.nom === "Enfant") {
             this.imageBanniere = "/assets/images/book_children.png"
             
          }else if(result.nom === "Romans et littérature"){
              this.imageBanniere = "/assets/images/banniere.png"
          }
          else if(result.nom === "Bibliographie"){
          this.imageBanniere = "/assets/images/banniere3.png"
        }
          
      }
    )
    
  }


 openModalDetails(id:any): void {
    const dialogRef = this.dialog.open(LivreDetailsComponent, {
      width: '550px',
      height:'370px' ,
      data: { title:"" , idLivre : id}
    });
  
  }

}
