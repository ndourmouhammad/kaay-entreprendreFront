import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  
}