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
  @Input() user!:any;
  @Input() reclamation!:any;
  @Output() ReclamationAddEvent = new EventEmitter<void>();
  @Input() isEdit!:boolean;
  @Output() isEditChange = new EventEmitter<boolean>();
  @Output() isReclamationChange = new EventEmitter<boolean>();
  showAlert: boolean = false;
  alertType: 'success' | 'error' = 'success';
  alertMessage: string | null = null;
  username: string | undefined;
  email: string ='';
  constructor(private formBuilder :FormBuilder,
    private userService:UserService,
    private reclamationService:ReclamationService,
    private route:Router){

  }
  ngOnInit(): void {
    this.userService.getUserInfo().then((userProfile: any) => {
      this.username = userProfile.username;
      this.email = userProfile.email;

      console.log('User Profile:', userProfile);
    }).catch((error: any) => {
      console.error(error);
    });
    this.reclamationForm=this.formBuilder.group({
      sujet: ['', Validators.required],
      description: ['', Validators.required],
    

      });
      
   }
  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['isEdit']&& this.isEdit) {
      this.reclamationForm.patchValue(this.reclamation);
      console.log('edit',this.isEdit);
    }
  }
      
       
       get myControls(){
        return this.reclamationForm.controls;
     }
     onSubmitForm(){

      if (!this.isEdit){

      this.reclamationService.add(this.reclamationForm.value).subscribe({
        next: (v) => {
          this.showAlert =true;
          this.alertType ='success';
          this.alertMessage = "reclamation ajouter avec succes";
          this.ReclamationAddEvent.emit();
         },
         error: (e) => {
          this.showAlert =true;
          this.alertType = 'error';
          this.alertMessage = "erreur d'ajout";
      },complete:()=>{
        setTimeout(() => {
          this.showAlert = false;          
          
        }, 4000);
      }
       
       
      });
    }else if(this.isEdit){
      
      this.reclamationService.update(this.reclamationForm.value,this.reclamation.id).subscribe({
        next: (v) => {
          this.showAlert =true;
          this.alertType ='success';
          this.alertMessage = "reclamation modifié avec succes";
        this.ReclamationAddEvent.emit();
        this.isEditChange.emit(this.isEdit);
        this.isReclamationChange.emit(this.reclamation);

       },
       error: (e) => {
        this.showAlert =true;
        this.alertType = 'error';
        this.alertMessage = "erreur de modification";
        
          },complete:()=>{
            setTimeout(() => {
              this.showAlert = false;          
              
            }, 4000);}
      })

    }

    }

}
