import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from './apiUrl';
import { Observable, throwError, catchError, tap } from 'rxjs';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Declaration des méthodes

  

  // Méthode pour récuperer les secteurs d'activités
  getSecteurActivites(): Observable<SecteurActiviteModel[]> {
    return this.http.get<SecteurActiviteModel[]>(`${apiUrl}secteurActivite`);
  }
  
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
  
    return this.http.post(`${apiUrl}logout`, {}, { headers }).pipe(
      // Remove the token and user data from localStorage after a successful response or in case of an error
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
      }),
      catchError((error) => {
        // If the error is 401 Unauthorized, the token is probably invalid or expired
        if (error.status === 401) {
          console.error('Invalid or expired token, forced logout.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.loggedIn.next(false);
        }
        // Propagate the error after handling forced logout
        return throwError(error);
      })
    );
  }
  
  

  // Méthode pour récuperer le nombre de users avec le role entrepreneur
  getEntrepreneurCount(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_entrepreneur`);
  }

  // Méthode pour récuperer le nombre de users avec le role coach
  getCoachCount(): Observable<any> {
    return this.http.get<any>(`${apiUrl}nombre_coach`);
  }

   
  
  
  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
  
}
