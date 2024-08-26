import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrl } from './apiUrl';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private http = inject(HttpClient);
  constructor() { }
  getGuide(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}guides/${id}`);
  }
  getEtapeDetails(id: number): Observable<any> {
    return this.http.get<any>(`${apiUrl}etapes/${id}`);
  }

 

  // Ajouter une nouvelle étape : http://127.0.0.1:8000/api/etapes 
  addEtape(etape: FormData): Observable<{ message: string, data: any }> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}etapes`, etape, { headers });
  }

  // Modifier une étape : http://127.0.0.1:8000/api/etapes/{id}
  updateEtape(etape: FormData, id: number): Observable<{ message: string, data: any }> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${apiUrl}etapes/${id}`, etape, { headers });
  }
  // Supprimer une étape : http://127.0.0.1:8000/api/etapes/{id}
  deleteEtape(id: number): Observable<{ message: string, data: any }> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No authentication token found');
      return throwError('No authentication token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${apiUrl}etapes/${id}`, { headers });
  }
}
