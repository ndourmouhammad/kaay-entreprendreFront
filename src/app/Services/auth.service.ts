import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // Méthodes pour se déconnecter
  logout() {
    return this.http.post(`${apiUrl}logout`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}
