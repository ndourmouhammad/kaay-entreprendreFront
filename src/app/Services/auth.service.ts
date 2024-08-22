import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { catchError, Observable, tap, throwError } from 'rxjs';
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

 public hasToken(): boolean {
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
    return this.http.post(`${apiUrl}logout`, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    }).pipe(
      // Supprimer le token du localStorage après la réponse réussie ou en cas d'erreur
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
      }),
      catchError((error) => {
        // Si l'erreur est 401 Unauthorized, le token est probablement invalide ou expiré
        if (error.status === 401) {
          console.error('Token invalide ou expiré, déconnexion forcée.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.loggedIn.next(false);
        }
        // Propager l'erreur après avoir géré la déconnexion forcée
        return throwError(error);
      })
    );
  }
  
  
  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
  
}
