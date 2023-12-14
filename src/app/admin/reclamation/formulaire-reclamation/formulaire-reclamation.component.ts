import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-formulaire-reclamation',
  templateUrl: './formulaire-reclamation.component.html',
  styleUrls: ['./formulaire-reclamation.component.scss']
})
export class FormulaireReclamationComponent implements OnInit,OnChanges{
  reclamationForm !:FormGroup;
  alertType!: 'success' | 'error' ;
  alertMessage!: string | null ;  @Input() reclamation!:any;
  @Output() ReclamationAddEvent = new EventEmitter<void>();
  @Input() isEdit!:boolean;
  @Output() isEditChange = new EventEmitter<boolean>();
  @Output() isReclamationChange = new EventEmitter<boolean>();
  user!:any;
  constructor(private formBuilder :FormBuilder,
    private userService:UserService,
    private reclamationService:ReclamationService,
    private route:Router){

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEdit']&& this.isEdit) {
      this.reclamationForm.patchValue(this.reclamation);
    }
  }
      ngOnInit(): void {
        this.userService.getUserByEmail(this.userService.getUserEmail()).subscribe(resultat=>{
          this.user = resultat;
        })
        this.reclamationForm=this.formBuilder.group({
          sujet: ['', Validators.required],
          description: ['', Validators.required],
        
  
          });
          console.log(this.isEdit);
          
       }
       
       get myControls(){
        return this.reclamationForm.controls;
     }
     onSubmitForm(){
      if(!this.isEdit){
      this.reclamationService.add(this.reclamationForm.value).subscribe({
        next: (v) => {
          this.alertType ='success';
          this.alertMessage ='reclamation ajouté avec succés'
          
          this.ReclamationAddEvent.emit();
          setTimeout(() => {
            this.alertMessage = null;
          
          }, 4000);
         },
         error: (e) => {
          this.alertType ='error';
          this.alertMessage ='erreur d\'ajout '
          
          this.ReclamationAddEvent.emit();
          setTimeout(() => {
            this.alertMessage = null;
          
          }, 4000);      }
       
       
      });
    }else if(this.isEdit){
      
      this.reclamationService.update(this.reclamationForm.value,this.reclamation.id).subscribe({
        next: (v) => {
          this.alertType ='success';
          this.alertMessage ='reclamation modifié avec succés'  ;  
              this.ReclamationAddEvent.emit();
        this.isEditChange.emit(this.isEdit);
        this.isReclamationChange.emit(this.reclamation);
        setTimeout(() => {
          this.alertMessage = null;
        
        }, 4000);  
       },
       error: (e) => {
        alert("erreur de modification");
    }
      })

    }

    }
  
}
