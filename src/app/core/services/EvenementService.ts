import { Injectable } from '@angular/core';
import { Evenement } from '../models/Evenement.model';
import { EtatEvenement } from '../models/etatEvenement.enum';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { UpdateStartDateDTO } from 'src/app/admin/evenement/components/calendar/update-start-date.dto';



@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  constructor(private http : HttpClient){ }
  
  private apiServerUrl = 'http://localhost:8082/evenements';
  
  
  

    addEvent(nomE : string , dateDebut:Date ,  dateFin : Date ,  lieu : string ,description:string ,  etatEvent : EtatEvenement , image:File ):Observable<Evenement>{

    const formData: FormData = new FormData();
    formData.append('nomE', nomE);
    formData.append('dateDebut', dateDebut.toString());
    formData.append('dateFin', dateFin.toString());
    formData.append('lieu', lieu);
    formData.append('description', description);
    formData.append('etatEvent', etatEvent);
    formData.append('image', image,image.name);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<Evenement>(this.apiServerUrl + '/addEvenement',formData);
  
    }
  getAllEvents() : Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiServerUrl + '');
}
public deleteEvent(id: number){
  return this.http.delete(this.apiServerUrl + `/${id}`);


}

getEvenementDetails(idEvenement: number): Observable<Evenement> {
  return this.http.get<Evenement>(`${this.apiServerUrl}/${idEvenement}`);
}


updateEvent(idEvenement: number, evenement: Evenement): Observable<Evenement> {
  const url = `${this.apiServerUrl}/${idEvenement}`;
  return this.http.put<Evenement>(url, evenement);
}
getEvenementById(idEvenement: number): Observable<Evenement> {
  const url = `${this.apiServerUrl}/${idEvenement}`; // Assurez-vous d'avoir la route appropriée dans votre API
  return this.http.get<Evenement>(url);
}
updateEvenement(idEvenement: number, evenement: Evenement): Observable<Evenement> {
  return this.http.put<Evenement>(this.apiServerUrl + '/updateevent'+ `/${idEvenement}`, evenement);
}
updateEventStartDate(idEvenement: number, newStartDate: Date): Observable<any> {
  return this.http.put(this.apiServerUrl + `/updateeventStartDate/${idEvenement}`, { newStartDate });
}


}