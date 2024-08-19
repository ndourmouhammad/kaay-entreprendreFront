import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
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
    return this.http.post(`${apiUrl}logout`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
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
