import { Component , OnInit , ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { BiblioService } from 'src/app/core/services/BiblioService';
import { ActivatedRoute , Router} from '@angular/router';
import { MsgerreurComponent } from '../msgerreur/msgerreur.component';


@Component({
  selector: 'app-addbiblio',
  templateUrl: './addbiblio.component.html',
  styleUrls: ['./addbiblio.component.scss']
})

export class AddbiblioComponent implements OnInit {

  biblioForm! : FormGroup;
  selectedFile!: File;
  nameFile!:string
  
  msg: string | undefined;
  error: string | undefined;

  @ViewChild('MsgErrorSuccess') MsgErrorSuccess !: MsgerreurComponent;

  receiveMessage(message: { msg: string; error: string }) {
    this.msg = message.msg;
    this.error = message.error;
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  constructor(private fb: FormBuilder , private BiblioService:BiblioService ,   private router: Router
    ) {}

  ngOnInit(): void {
    this.biblioForm = this.fb.group({
      nomB: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(8)]],
      numTel: [null, [Validators.required, Validators.minLength(8)]],
      horaire: [null, [Validators.required ,Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(5)]],
      imageB: [null], // Ajoutez des validateurs si nécessaire


    });
  }
  get f() {
    return this.biblioForm.controls;
  }
  AjouterBiblio(){
    this.BiblioService.addBiblio(
    this.biblioForm.get('nomB')?.value,
    this.biblioForm.get('email')?.value,
    this.biblioForm.get('numTel')?.value,
    this.biblioForm.get('horaire')?.value,
    this.biblioForm.get('description')?.value,
      this.selectedFile).subscribe(

        ()=>{
          this.msg = "La Bibliotheque a été ajoutée avec succès.";
          this.error = '';
          this.MsgErrorSuccess.sendMessage(this.msg, this.error);          
          this.biblioForm.reset();
          this.refreshBibliosList();
  
        },()=>{
          this.msg = '';
      this.error = "Il y a une erreur qui est survenue";

      this.MsgErrorSuccess.sendMessage(this.msg, this.error);
        }
      )
    }
    private refreshBibliosList() {
    this.BiblioService.getAllBiblios();
  }


}