import { HttpClient } from '@angular/common/http';
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
    return this.http.get<UserModel[]>(`${apiUrl}coaches`);
  }
  getSecteures():Observable<SecteurActiviteModel[]>{
    return this.http.get<SecteurActiviteModel[]>(`${apiUrl}secteurs`);
  }
  getCoachesBySecteur(secteurId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${apiUrl}coaches/secteur/${secteurId}`);
  }
  getCoachById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(`${apiUrl}coach/${id}`);
    
  }
  sendRequest(senderId: number, receiverId: number, message: string): Observable<any> {
    return this.http.post<any>(`${apiUrl}accompagnement-personnalise`, {
      sender_id: senderId,
      receiver_id: receiverId,
      message: message
    });
  }
}
