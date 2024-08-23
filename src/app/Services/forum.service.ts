import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../Models/forums.model';
import { Commentaire } from '../Models/commentaires.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = "https://kaayentreprendre.ndourmouhammad15.simplonfabriques.com/api/discussions";
  addForum: any;

  constructor(private http: HttpClient) { }

  getForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.apiUrl);
  }

  addComment(comment: Commentaire): Observable<Commentaire> {
    const commentsUrl = `${this.apiUrl}/${comment.forum_id}/comments`; // URL pour ajouter un commentaire à un forum spécifique
    return this.http.post<Commentaire>(commentsUrl, comment);
  }
}
