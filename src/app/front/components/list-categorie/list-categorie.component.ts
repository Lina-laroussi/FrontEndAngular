import { Component, EventEmitter, OnInit , Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/core/models/categorie.model';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { LivreService } from 'src/app/core/services/livre.service';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit{


  constructor(private categorieService:CategorieService , private livreService:LivreService , private router:Router){

  }


  urlImage : string  = 'http://localhost:8080/images' 

  categorieList !: Observable<Categorie[]>

  ngOnInit(): void {
    this.categorieList =  this.categorieService.getAllCategorie();
  }

  isHovered: boolean = false;

  onMouseOver(categorie:any) {
    categorie.isHovered = !categorie.isHovered;
  }

  onMouseOut(categorie:any) {
    categorie.isHovered = categorie.isHovered;
  }



  getLivresByCategory(idCategorie:any){
      this.router.navigateByUrl(`/front/listLivres/${idCategorie}`)
  }

}
