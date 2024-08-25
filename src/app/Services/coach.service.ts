import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/users.model';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
private http=inject(HttpClient);
  constructor() { }
  getCoaches(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${apiUrl}coaches-accompagnement`);
  }
  getSecteures():Observable<SecteurActiviteModel[]>{
    return this.http.get<SecteurActiviteModel[]>(`${apiUrl}secteurActivite`);
  }
  getCoachesBySecteur(secteurId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${apiUrl}coaches/secteur/${secteurId}`);
  }
  getCoachById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${apiUrl}coach/${id}`);
    
  }
  // Demande d'accompagnement : http://127.0.0.1:8000/api/accompagnement/{id}
  demanderAccompagnement(receiverId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
    });

    return this.http.post(`${apiUrl}/${receiverId}`, { headers });
  }
}
