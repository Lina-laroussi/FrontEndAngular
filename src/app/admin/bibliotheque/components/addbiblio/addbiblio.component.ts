import { Component , OnInit , ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { BiblioService } from 'src/app/core/services/BiblioService';
import { ActivatedRoute , Router} from '@angular/router';
import { MsgerreurComponent } from '../msgerreur/msgerreur.component';
import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';
import { Bibliotheque } from 'src/app/core/models/Bibliotheque.model';


@Component({
  selector: 'app-addbiblio',
  templateUrl: './addbiblio.component.html',
  styleUrls: ['./addbiblio.component.scss']
})

export class AddbiblioComponent implements OnInit {

  biblioForm: any = {};
  selectedFile: File | undefined;
  nameFile!:string
 
  biblio:Bibliotheque = new Bibliotheque ();

  msg: string | undefined;
  error: string | undefined;

  @ViewChild('MsgErrorSuccess') MsgErrorSuccess !: MsgerreurComponent;
  @ViewChild('addBiblio') addBiblioForm!: NgForm;


  receiveMessage(message: { msg: string; error: string }) {
    this.msg = message.msg;
    this.error = message.error;
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  constructor(  private BiblioService:BiblioService ,   private router: Router
    ) {}


    ngOnInit(): void {
    
    }

  

  AjouterBiblio(){
    if (!this.selectedFile) {
      console.error('Selected file is undefined.');
      // Optionally, you can display an error message or take other actions.
      return;
    }

    this.BiblioService.addBiblio(
      this.addBiblioForm.value.nomB,
      this.addBiblioForm.value.email,
      this.addBiblioForm.value.numTel,
      this.addBiblioForm.value.horaire,
      this.addBiblioForm.value.description,
      this.selectedFile,
      )
      .subscribe(
      ()=>{
        this.msg = "Bibliotheque ajouté avec succées"       
        this.addBiblioForm.reset() 
        timer(2000).subscribe(() => {
          this.router.navigateByUrl('/admin/bibliotheque/listbiblio');
        });
     },
     ()=>{
          this.error = "Il ya une erreur qui est survenu"
     }
     )
    
    
  }
  private refreshBibliosList() {
    this.BiblioService.getAllBiblios();
  }
}