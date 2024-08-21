import { EvenementModel } from './../Models/evenements.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EvenementsService {

  private http = inject(HttpClient)

  // Méthode pour récuperer le nombre d'événements
  getEvenementCount(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_evenements`);
  }

  // Méthode pour récuperer le nombre d'événements à venir
  getEvenementCountToCome(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_evenements_a_venir`);
  }
  
  // Méthode pour récuperer la liste des Événements
  getEvenements(): Observable<{ message: string, data: EvenementModel[] }> {
    return this.http.get<{ message: string, data: EvenementModel[] }>(`${apiUrl}evenements`);
  }
  
  // Méthode pour afficher les details d'un seul événement
  getEvenement(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}evenements/${id}`);
  }

  
}