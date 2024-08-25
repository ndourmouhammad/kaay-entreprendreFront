import { Component, OnInit, inject } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { environment } from '../../../../environnements/environments';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-evenement-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    
  ],
  templateUrl: './evenement-admin.component.html',
  styleUrl: './evenement-admin.component.css'
})
export class EvenementAdminComponent implements OnInit {

  // Injection des dépendances
  private eventService = inject(EvenementsService)
  private route : ActivatedRoute = inject(ActivatedRoute)

  events: EvenementModel[] = []
  baseUrl: string = environment.apiUrl
  filteredEvents: EvenementModel[] = [];
  searchQuery: string = ''; // Search query input by user
  

  ngOnInit(): void {
    this.getEvents()
  }

  getEvents(): void {
    this.eventService.getEvenements().subscribe(
      (response: any) => {
        console.log('Data:', response); // Vérifiez ici ce que vous recevez
        this.events = response.data; // Assurez-vous de prendre le tableau 'data'
      },
      (error: any) => {
        console.error('Error:', error); // En cas d'erreur, affichez-la
      }
    );
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  

}
