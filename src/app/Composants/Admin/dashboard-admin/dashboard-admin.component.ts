import { Component, inject, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EvenementsService } from '../../../Services/evenements.service';
import { EvenementModel } from '../../../Models/evenements.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    NgFor,
    DatePipe,
    RouterModule,
    RouterLink
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit {
  entrepreneurCount: number = 0;
  entrepreneurCount$?: Observable<number>;

  coachCount: number = 0;
  coachCount$?: Observable<number>;

  eventsCount: number = 0;
  eventsCount$?: Observable<number>;

  eventsCome: number = 0;
  eventsCome$?: Observable<number>;

  events: EvenementModel[] = [];  // Array to store events

  // Injection des dépendances
  private authService = inject(AuthService);
  private eventService = inject(EvenementsService)
  private router = inject(Router);

  ngOnInit(): void {
    // Récuperation du nombre de users avec le role entrepreneur
    this.entrepreneurCount$ = this.authService.getEntrepreneurCount().pipe(
      map(response => response.entrepreneurs) // Extract the 'entrepreneurs' key from the response
    );

    this.entrepreneurCount$.subscribe(
      count => {
        this.entrepreneurCount = count; // Set the count to the component variable
      },
      error => {
        console.error('Failed to load entrepreneur count', error);
      }
    );

    // Récuperation du nombre de users avec le role coach
    this.coachCount$ = this.authService.getCoachCount().pipe(
      map(response => response.coaches) // Extract the 'coaches' key from the response
    );

    this.coachCount$.subscribe(
      count => {
        this.coachCount = count; // Set the count to the component variable
      },
      error => {
        console.error('Failed to load coach count', error);
      }
    );

    // Récuperation du nombre d'événements
    this.eventsCount$ = this.eventService.getEvenementCount().pipe(
      map(response => response.evenements) // Extract the 'evenements' key from the response
    );

    this.eventsCount$.subscribe(
      count => {
        this.eventsCount = count; // Set the count to the component variable
      },
      error => {
        console.error('Failed to load event count', error);
      }
    );

    // Récuperation du nombre d'événements à venir
    this.eventsCome$ = this.eventService.getEvenementCountToCome().pipe(
      map(response => response.evenements) // Extract the 'evenements' key from the response
    );

    this.eventsCome$.subscribe(
      count => {
        this.eventsCome = count; // Set the count to the component variable
      },
      error => {
        console.error('Failed to load event count', error);
      }
    );

    // Récupérer la liste des événements
    this.eventService.getEvenements().subscribe(
      (response) => {
        this.events = response.data.slice(0, 3); // Assign only the first 3 events to this.events
        console.log(this.events); // Check the extracted array in the console
      },
      (error) => {
        console.error('Failed to load events', error);
      }
    );
    
    
  }
}

