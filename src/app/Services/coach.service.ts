import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/users.model';
import { SecteurActiviteModel } from '../Models/secteuractivite.model';
import { throwError } from 'rxjs';

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
//  demanderAccompagnement(receiverId: number): Observable<any> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
//   });

//   // Construct the URL properly without extra slashes
//   return this.http.post(`${apiUrl}accompagnement/${receiverId}`, {}, { headers });
// }


demanderAccompagnement(receiverId: number): Observable<any> {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
      console.error('No authentication token found');
      return throwError(() => new Error('No authentication token found'));
  }

  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
  });

  return this.http.post<any>(`${apiUrl}accompagnement/${receiverId}`, {}, { headers });

}

}
