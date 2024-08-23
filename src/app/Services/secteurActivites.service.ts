
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {

private http = inject(HttpClient);

  // Methode pour recuperer toutes les activites
  getAllActivites(){
      return this.http.get(`${apiUrl}/demande-accompagnement`);
  }

  // Methode pour recuperer les coachs par activite
  getAllCoachs(){
    return this.http.get(`${apiUrl}/demande-accompagnement-coach`);
}



}



