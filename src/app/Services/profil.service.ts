import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelProfil } from '../Models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  
private http= inject(HttpClient)


getUserProfile(): Observable<any> {
  const token = localStorage.getItem('access_token');
  console.log('Token:', token); 
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
console.log('Authorization Header:', headers.get('Authorization'));
  return this.http.get(`${apiUrl}profil`,{headers});
}
updateUserProfile(profileData: ModelProfil): Observable<any> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${apiUrl}profil/${profileData.id}`, profileData, { headers });
}
getmesreservation(): Observable<any> {
  const token = localStorage.getItem('access_token');
  console.log('Token:', token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  console.log('Authorization Header:', headers.get('Authorization'));
  return this.http.get<any[]>(`${apiUrl}mes-reservations`, { headers });
}


}
