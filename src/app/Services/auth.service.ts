import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError } from 'rxjs';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Declaration des méthodes

  // Méthodes pour l'authentification
  login(identifiant: any){
    return this.http.post(`${apiUrl}login`, identifiant);
  }

  // Méthode pour récuperer les secteurs d'activités
  getSecteurActivites(): Observable<SecteurActiviteModel[]> {
    return this.http.get<SecteurActiviteModel[]>(`${apiUrl}secteurs`);
  }
  

  // Méthode pour l'inscription
  register(identifiant: any){
    return this.http.post(`${apiUrl}register`, identifiant);
  }

  // Méthodes pour se déconnecter
  logout() {
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${apiUrl}logout`, {}, { headers });
  }
  

  // Méthode pour récuperer le nombre de users avec le role entrepreneur
  getEntrepreneurCount(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_entrepreneur`);
  }

  // Méthode pour récuperer le nombre de users avec le role coach
  getCoachCount(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_coach`);
  }

  
}
