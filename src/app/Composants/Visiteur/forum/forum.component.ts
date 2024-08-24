import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ForumService } from '../../../Services/forum.service';
import { CommonModule } from '@angular/common';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { Discussion } from '../../../Models/forum.model';
import { environment } from '../../../../environnements/environments';

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
  newForum: Discussion = { 
    id: 0, 
    libelle: '', 
    contenu: '', 
    user_id: 0,
    created_at: '', 
    updated_at: '',
    date: ''
  };
  searchTerm: string = '';
  forums!: Discussion[];
  
  baseUrl: string = environment.apiUrl;

  constructor(private forumService: ForumService, private router: Router) {}

  ngOnInit(): void {
    this.loadForums();
  }

  // loadForums(): void {
  //   this.forumService.getDiscussions().subscribe(
  //     (data: Discussion[]) => this.forums = data,
  //     (error: any) => console.error('Error loading forums:', error)
  //   );
  // }

  loadForums(): void {
    this.forumService.getDiscussions().subscribe(
      (data: Discussion[]) => {
        this.forums = data;
      },

      (error: any) => {
        console.error('Error loading forums:', error);
      }

    );
  }

  get filteredForums(): Discussion[] {
    return this.forums.filter(forum => 
      forum.libelle.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addForum(): void {
    // this.forumService.addForum(this.newForum).subscribe(
    //   (forum: Forum) => {
    //     this.forums.push(forum);
    //     this.newForum = { id: 0, libelle: '', contenu: '', user_id: 0, created_at: '', updated_at: '', date: '' };
    //   },
    //   (error: any) => console.error('Error adding forum:', error)
    // );
  }

  viewForumDetails(id: number): void {
    this.router.navigate(['/forum', id]);
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}