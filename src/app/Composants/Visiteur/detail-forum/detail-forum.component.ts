import { Commentaire } from './../../../Models/commentaire.model';
import { RouterLink, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../../../Services/forum.service';
import { Discussion } from '../../../Models/forum.model';
import { environment } from '../../../../environnements/environments';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentaireService } from '../../../Services/commentaire.service';


@Component({
  selector: 'app-detail-forum',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterLink,
    RouterModule,
    NgFor,
    DatePipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './detail-forum.component.html',
  styleUrls: ['./detail-forum.component.css']
})
export class DetailForumComponent implements OnInit {
  discussion: Discussion = {
    id: 0,
    libelle: '',
    contenu: '',
    created_at: '',
    updated_at: '',
    date: '',
    commentaires: [],
    user: {}
  };
  newComment: { contenu: string } = { contenu: '' };
  baseUrl: string = environment.apiUrl;
  Commentaire: Commentaire[] = []

  constructor(private forumService: ForumService, private route: ActivatedRoute, private commentaireService: CommentaireService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDiscussion(Number(id));
    }
  }

  loadDiscussion(id: number): void {
    console.log('Chargement de la discussion avec ID:', id);
    this.forumService.getDiscussion(id).subscribe(
      (response: any) => {
        console.log('Réponse brute de l\'API:', response);
        if (response) {
          // Assignez directement les données de la discussion
          this.discussion = response;
          console.log('Discussion après affectation:', this.discussion);
  
          // Chargez les commentaires si l'ID de la discussion est valide
          if (this.discussion.id) {
            this.loadComments(this.discussion.id);
          }
        } else {
          console.error('Aucune donnée trouvée dans la réponse.');
        }
      },
      (error: any) => console.error('Erreur lors du chargement de la discussion:', error)
    );
  }
  
  
  loadComments(discussionId: number): void {
    this.commentaireService.getComments(discussionId).subscribe(
      
      (response: any) => {
        console.log('Réponse des commentaires:', response);
        this.Commentaire = response
        console.log('Commentaires', this.Commentaire)
        if (response && response.data) {
          this.discussion.commentaires = response;
          console.log('Commentaires après chargement:', this.discussion.commentaires);
        } else {
          console.error('Aucun commentaire trouvé dans la réponse.');
        }
      },
      (error) => console.error('Erreur lors du chargement des commentaires:', error)
    );
  }
  
  
  

  addComment(): void {
    if (this.discussion && this.newComment.contenu.trim()) {
      const formData = new FormData();
      formData.append('contenu', this.newComment.contenu);

      this.forumService.addComment(this.discussion.id, formData).subscribe(
        () => {
          this.newComment.contenu = ''; // Réinitialiser le formulaire
          this.loadComments(this.discussion.id); // Rafraîchir la liste des commentaires
        },
        (error: any) => console.error('Erreur lors de l\'ajout du commentaire:', error)
      );
    }
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
