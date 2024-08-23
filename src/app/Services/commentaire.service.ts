import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = "https://kaayentreprendre.ndourmouhammad15.simplonfabriques.com/api";

  constructor(private http: HttpClient) {}

  getCommentaires(discussionId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${discussionId}`);
  }

  addCommentaire(discussionId: string, contenu: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${discussionId}`, { contenu });
  }

  deleteCommentaire(discussionId: string, commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${discussionId}/${commentId}`);
  }
}
