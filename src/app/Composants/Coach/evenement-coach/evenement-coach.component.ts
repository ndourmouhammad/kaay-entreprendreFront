import { Component, OnInit, inject } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { environment } from '../../../../environnements/environments';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evenement-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    RouterLink,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
  ],
  templateUrl: './evenement-coach.component.html',
  styleUrl: './evenement-coach.component.css'
})
export class EvenementCoachComponent implements OnInit {

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
