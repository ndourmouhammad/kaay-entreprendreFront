
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

  export class CommentaireService  {

    private http = inject(HttpClient)

    getComments(id: number): Observable<{ message: string, data: Commentaire[] }> {
        return this.http.get<{ message: string, data: Commentaire[] }>(`${apiUrl}discussions/${id}/commentaires`);
      }

  } 