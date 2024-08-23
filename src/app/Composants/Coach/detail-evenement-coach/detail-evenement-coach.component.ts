import { ReservationsService } from './../../../Services/reservations.service';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { environment } from '../../../../environnements/environments';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-detail-evenement-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    RouterLink,
    RouterModule,
    NgIf,
    NgFor,
    FormsModule,
    DatePipe
  ],
  templateUrl: './detail-evenement-coach.component.html',
  styleUrl: './detail-evenement-coach.component.css'
})
export class DetailEvenementCoachComponent implements OnInit {

  // Injection des dépendances
  private eventService = inject(EvenementsService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private ReservationsService = inject(ReservationsService)


  event: EvenementModel = {}; // Provide a default value if needed
  baseUrl: string = environment.apiUrl;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID parameter');
      return;
    }
    this.getEvenement(id);
  }

  getEvenement(id: number): void {
    this.eventService.getEvenement(id).subscribe(
      (response: any) => {
        console.log('Event Data:', response);
        this.event = response.data || {}; // Ensure event is assigned correctly
      },
      (error: any) => {
        console.error('Event Error:', error);
      }
    );
  }


  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  reserveEvent(): void {
    const formData = new FormData();
    // Add necessary data to formData if needed
    // For example, if there's a form input for reservation details, include it here.

    if (this.event && this.event.id) {
      this.ReservationsService.addReservation(formData, this.event.id).subscribe(
        (response: any) => {
          console.log('Reservation successful:', response);
          // Handle successful reservation, e.g., show a success message
        },
        (error: HttpErrorResponse) => {
          console.error('Reservation failed:', error);
          // Handle error, e.g., show an error message
        }
      );
    } else {
      console.error('Event ID is not available');
    }
  }

}
