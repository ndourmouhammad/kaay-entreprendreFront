import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';
import { UserModel } from '../Models/users.model';

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

   // Méthode pour afficher le profil  coach
   getProfilCoach(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${apiUrl}coachs/{id}`);
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
}
