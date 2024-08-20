import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
