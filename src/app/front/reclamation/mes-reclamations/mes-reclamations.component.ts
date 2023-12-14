import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mes-reclamations',
  templateUrl: './mes-reclamations.component.html',
  styleUrls: ['./mes-reclamations.component.scss']
})
export class MesReclamationsComponent implements OnInit {
reclamations!:any[];
user!:any
deletedRec!:any;

isEditModal : boolean=false;
selectedReclamation:any;
constructor(private reclamationService:ReclamationService,
  private userService:UserService){

}
ngOnInit(): void {
    this.reclamationService.getAllRec('archivé').subscribe(
      {
        next:(rec)=>this.reclamations =rec,
        error:(r)=>alert(r)
      }
    )
     
    

  

  }
  deletedReclamation(rec:any){
    this.deletedRec = rec;
  }
  changerEtat(recl:any,etat:any){
    const updatedRecIndex = this.reclamations.findIndex(r => r.id === recl.id);
    console.log(updatedRecIndex);
    this.reclamationService.changerEtat(recl.id,etat).subscribe(
      result=>{
        console.log(this.reclamations.splice( updatedRecIndex , 1));
         this.reclamations.splice(updatedRecIndex , 1);
         this.reclamations ;
      }
    )
    
  }
  rechargeReclamations(){
    this.reclamationService.getMyRec( this.user.email,"archivé").subscribe({
      next:(rec)=>this.reclamations =rec,
      error:(r)=>alert(r)
    }
  
    )}
    openEdit(reclamation:any){
      this.isEditModal =true;
      this.selectedReclamation = reclamation;
    }
    openAdd(){
      this.isEditModal = false;
    }
}


