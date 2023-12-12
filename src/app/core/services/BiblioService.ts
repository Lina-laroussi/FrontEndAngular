import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bibliotheque } from '../models/Bibliotheque.model';
import { Livre } from '../models/livre.model';



@Injectable({
  providedIn: 'root'
})
export class BiblioService {


  constructor(private http : HttpClient){ }
  
  private apiServerUrl = 'http://localhost:8080/bibliotheques';
  
  addBiblio(nomB : string , email:string ,  numTel : number ,  horaire : string ,description:string , imageB:File  ):Observable<Bibliotheque>{
    const formData: FormData = new FormData();
    formData.append('nomB', nomB);
    formData.append('email', email);
    formData.append('numTel', numTel.toString());
    formData.append('horaire', horaire);
    formData.append('description', description);
    formData.append('imageB', imageB, imageB ? imageB.name : 'defaultFileName');

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<Bibliotheque>(this.apiServerUrl + '/addbibliotheque', formData);

  
    }

  
  getAllBiblios() : Observable<Bibliotheque[]> {
    return this.http.get<Bibliotheque[]>(this.apiServerUrl + '');
}
public deleteBiblio(idBibliotheque: number){
   return this.http.delete(this.apiServerUrl + `/${idBibliotheque}`);
  
 }
 getBibliothequeById(idBibliotheque: number): Observable<Bibliotheque> {
  const url = `${this.apiServerUrl}/${idBibliotheque}`; // Assurez-vous d'avoir la route appropriée dans votre API
  return this.http.get<Bibliotheque>(url);
}
updateBibliotheque(idBibliotheque: number, bibliotheque: Bibliotheque): Observable<Bibliotheque> {
  return this.http.put<Bibliotheque>(this.apiServerUrl + '/updatebiblio'+ `/${idBibliotheque}`, bibliotheque);

}
getBibliothequeByFoyer(idFoyer:any) : Observable<Bibliotheque> {
  return this.http.get<Bibliotheque>(this.apiServerUrl + `/byfoyer/${idFoyer}`);
}
getBibliothequeByEvenement(idEvenement:any) : Observable<Bibliotheque> {
  return this.http.get<Bibliotheque>(this.apiServerUrl + `/evenement/${idEvenement}`);
}


getAllLivres() : Observable<Livre[]> {
  return this.http.get<Livre[]>("http://localhost:8080/livres/all");
}


ajouterLivreBiblio(idLivre : any ,idBib:any){
  const body = {}
  return this.http.put<Bibliotheque>(this.apiServerUrl + '/ajoutLivre'+ `/${idLivre}/${idBib}`,body);
}


}