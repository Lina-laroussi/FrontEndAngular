import { Component, OnInit, ViewChild } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { UserService } from 'src/app/services/user.service';
import { PaginationDirective } from 'src/app/shared/directives/pagination.directive';

@Component({
  selector: 'app-liste-reclamations',
  templateUrl: './liste-reclamations.component.html',
  styleUrls: ['./liste-reclamations.component.scss']
})
export class ListeReclamationsComponent implements OnInit{
  @ViewChild(PaginationDirective, { static: true }) paginationDirective!: PaginationDirective;

reclamations!:any
user!:any
isEditModal : boolean=false;
selectedReclamation:any;
paginatedItems: any[] = [];
itemsPerPage: number = 5;
currentPage: number = 1;
totalPages: number = 0;
items:any[] =[];
constructor(private reclamationService:ReclamationService,
  private userService:UserService){

}
ngOnInit(): void {
  
    this.reclamationService.getAllRec("archivé").subscribe({
      next:(rec)=>{this.reclamations =rec;
      },
      error:(r)=>alert(r)
    })
  }
  rechargeReclamations(){
    this.reclamationService.getAllRec("archivé").subscribe({
      next:(rec)=>this.reclamations =rec,
  
      error:(r)=>alert(r)
    }
  
    )}
    openEdit(reclamation:any){
      this.isEditModal =true;
      console.log(this.isEditModal);
      this.selectedReclamation = reclamation;
    }
    setPage(pageNumber: number): void {
      // Call the setPage method of PaginationDirective
      // This will trigger the paginatedItems and currentPage outputs
      this.paginationDirective.setPage(pageNumber);
    }
    updateItems(items: any[]): void {
      this.paginatedItems = items;
    }
    updateCurrentPage(pageNumber: number): void {
      this.currentPage = pageNumber;
    }
}