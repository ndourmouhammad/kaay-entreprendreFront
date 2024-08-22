import { EvenementModel } from './../Models/evenements.model';
import { Injectable, inject,  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError } from 'rxjs';


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


  
  // Méthode pour ajouter un nouvel evenement
  addEvenement(evenement: FormData): Observable<{ message: string, data: EvenementModel }> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        console.error('No authentication token found');
        return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${apiUrl}evenements`, evenement, { headers });
  }
  
  // Méthode pour modifier un evenement
  updateEvenement(evenement: FormData, id: number): Observable<{ message: string, data: EvenementModel }> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
        console.error('No authentication token found');
        return throwError(() => new Error('No authentication token found'));
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${apiUrl}evenements/${id}`, evenement, { headers });
  }
  
}