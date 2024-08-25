import { Component, inject, OnInit } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
import { EvenementsService } from '../../../Services/evenements.service';
import { EvenementModel } from '../../../Models/evenements.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    NgFor,
    DatePipe,
    RouterModule,
    RouterLink
  ],
  templateUrl: './dashboard-coach.component.html',
  styleUrl: './dashboard-coach.component.css'
})
export class DashboardCoachComponent implements OnInit  {

  events: EvenementModel[] = [];  // Array to store events

  // Injection des dépendances
  private authService = inject(AuthService);
  private eventService = inject(EvenementsService)
  private router = inject(Router)


  ngOnInit(): void {
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
