import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Discussion } from '../Models/forum.model';
import { Commentaire } from '../Models/commentaire.model';
import { apiUrl } from './apiUrl';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ForumService {
  
    private http = inject(HttpClient);
    

    getDiscussions(): Observable<any> {
        return this.http.get<{ message: string, data: Discussion[] }>(`${apiUrl}discussions`);
    }

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

    getDiscussion(id: number): Observable<any> {
      console.log('Appel API pour discussion avec ID:', id);
      return this.http.get<any>(`${apiUrl}discussions/${id}`);
    }
    
    

    // getComments(id:number): Observable<any> {
    //   return this.http.get<any>(`${apiUrl}discussions/${id}/commentaires`)
    // }
    
    
    
    getComments(id: number): Observable<{ message: string, data: Commentaire[] }> {
      return this.http.get<{ message: string, data: Commentaire[] }>(`${apiUrl}discussions/${id}/commentaires`);
    }
    
    
  

    
    

    // Method to add a comment to a specific discussion
    addComment(discussionId: number, comment: FormData): Observable<any> {
        const token = localStorage.getItem('access_token');
        
        if (!token) {
            console.error('No authentication token found');
            return throwError(() => new Error('No authentication token found'));
        } 

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.post<any>(`${apiUrl}discussions/${discussionId}/commentaire`, comment, { headers });
    }
}
