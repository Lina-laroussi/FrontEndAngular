import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  httpOptions ={
    headers : new HttpHeaders({'Content-Type': 'application/json'})}
  url ="http://localhost:8085/api/reclamations"
  constructor(private httpClient: HttpClient) {


  }
  getMyRec(email:string,etat:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.url}/mesRec?email=${email}&etat=${etat}`)
  }
  getAllRec(etat:string):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.url}/listeRec?etat=${etat}`)
  }
  add(data:any):Observable<any>{
    return this.httpClient.post<any>(`${this.url}/ajouter`,data)
  }
  update(data:any,id:number):Observable<any>{
    return this.httpClient.put<any>(`${this.url}/modifier/${id}`,data)
  }
  changerEtat(id:any,etat:any):Observable<any>{
    return this.httpClient.put<any>(`${this.url}/changerEtat?id=${id}`,etat)
  }
}