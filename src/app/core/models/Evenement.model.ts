import { EtatEvenement } from '../models/etatEvenement.enum';
import { Bibliotheque } from './Bibliotheque.model';
export class Evenement{
    idEvenement?:number;
    nomE!:string;
    dateDebut!:Date;
    dateFin!:Date;
    lieu!:string;
    description!:string;
    bibliotheque !: Bibliotheque;
    etatEvent!:EtatEvenement;
    image?:File;

    
    
   
   }