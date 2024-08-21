import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, tap } from 'rxjs';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Declaration des méthodes
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }
  
  // Méthodes pour l'authentification
  login(identifiant: any): Observable<any> {
    return this.http.post(`${apiUrl}login`, identifiant).pipe(
      tap((response: any) => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.setLoggedIn(true);
        }
      })
    );
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
    // Envoyer la requête de déconnexion
    return this.http.post(`${apiUrl}logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    }).pipe(
      // Supprimer le token du localStorage après la réponse
      tap(() => localStorage.removeItem('access_token')),
      // Mettre à jour l'état de connexion
      tap(() => this.loggedIn.next(false))
    );
  }
  
  
  
}
