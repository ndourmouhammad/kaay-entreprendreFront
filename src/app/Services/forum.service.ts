import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Discussion } from '../Models/forum.model';
import { Commentaire } from '../Models/commentaire.model';
import { apiUrl } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  
    private http = inject(HttpClient)

    getDiscussions(): Observable<any> {
        return this.http.get<{ message: string, data: Discussion[] }>(`${apiUrl}discussions`);
      }

      

      // Méthode pour ajouter une discussion : http://127.0.0.1:8000/api/discussions (authentification requise)

      addDiscussion(discussion: FormData): Observable<{ message: string, data: Discussion }> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        } 

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        }); 

        return this.http.post<any>(`${apiUrl}discussions`, discussion, { headers });
    }
}