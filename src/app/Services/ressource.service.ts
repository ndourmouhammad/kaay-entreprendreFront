import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
  private http = inject(HttpClient);
//  methode pour afficher l'ensemble des ressource
getAllRessource(){
  return this.http.get(`${apiUrl}ressources`);
}
getRessourcesByCategorie(categorieId: number) {
  return this.http.get<any>(`${apiUrl}ressources?categorie_id=${categorieId}`);
}
private getToken(): string {
  // Assurez-vous de récupérer le token de manière sécurisée, par exemple depuis le stockage local ou un service d'authentification.
  return localStorage.getItem('authToken') || '';
}
getRessourceById(id: number) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`,
    'Content-Type': 'application/json'
  });
  return this.http.get(`${apiUrl}ressources/${id}`, { headers });
}


}
