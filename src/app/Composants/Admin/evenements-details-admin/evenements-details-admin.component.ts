import { Component, inject, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { environment } from '../../../../environnements/environments';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationModel } from '../../../Models/reservation.model';
import { ReservationsService } from '../../../Services/reservations.service';

@Component({
  selector: 'app-evenements-details-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgFor,
    NgIf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './evenements-details-admin.component.html',
  styleUrls: ['./evenements-details-admin.component.css']
})
export class EvenementsDetailsAdminComponent implements OnInit {
  private eventService = inject(EvenementsService);
  private reservationsService = inject(ReservationsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  baseUrl: string = environment.apiUrl;
  event: EvenementModel = {}; // Provide a default value if needed
  reservation: ReservationModel[] = []; // Initialize as an empty array

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID parameter');
      return;
    }
    this.getEvenement(id);
    this.getReservation(id);
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

  getReservation(id: number): void {
    this.reservationsService.getReservations(id).subscribe(
      (response: any) => {
        console.log('Reservation Data:', response);
        this.reservation = response; // Assign data to reservation
        console.log('Reservations:', this.reservation);
      },
      (error: any) => {
        console.error('Reservation Error:', error);
        this.reservation = []; // Ensure reservation is always an array
      }
    );
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
