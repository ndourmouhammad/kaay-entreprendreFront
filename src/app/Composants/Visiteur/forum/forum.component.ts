import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ForumService } from '../../../Services/forum.service';
import { CommonModule } from '@angular/common';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Discussion } from '../../../Models/forum.model';
import { environment } from '../../../../environnements/environments';
import { AuthService } from '../../../Services/auth.service'; // Import AuthService
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  @ViewChild('ajouterModal', { static: true }) ajouterModal!: TemplateRef<any>;

  newForum: Discussion = { 
    id: 0, 
    libelle: '', 
    contenu: '', 
    created_at: '', 
    updated_at: '',
    date: ''
  };
  searchTerm: string = '';
  forums: Discussion[] = []; // Initialize as an empty array

  baseUrl: string = environment.apiUrl;

  constructor(
    private forumService: ForumService,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.forumService.getDiscussions().subscribe(
      (data: Discussion[]) => {
        this.forums = data;
        console.log('Forums:', this.forums);
      },
      (error: any) => {
        console.error('Error loading forums:', error);
      }
    );
  }

  addForum(): void {
    const formData = new FormData();
    formData.append('id', this.newForum.id.toString());
    formData.append('libelle', this.newForum.libelle);
    formData.append('contenu', this.newForum.contenu);
    formData.append('created_at', this.newForum.created_at);
    formData.append('updated_at', this.newForum.updated_at);
    formData.append('date', this.newForum.date);

    this.forumService.addDiscussion(formData).subscribe(
      (response: { message: string; data: Discussion }) => {
        // Clear the form
        this.newForum = { id: 0, libelle: '', contenu: '', created_at: '', updated_at: '', date: '' };
        
        this.modalService.dismissAll(); // Close all open modals
        // Refresh the forums list
        this.loadForums();
      },
      (error: any) => console.error('Error adding forum:', error)
    );
  }

  viewForumDetails(id: number): void {
    this.router.navigate(['/forum', id]);
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  openModal(): void {
    this.modalService.open(this.ajouterModal);
  }
}
