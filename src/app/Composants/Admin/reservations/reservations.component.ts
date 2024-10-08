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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
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
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {

  private eventService = inject(EvenementsService);
  private reservationsService = inject(ReservationsService);
  private route: ActivatedRoute = inject(ActivatedRoute);

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

   // Méthode pour approuver une reservation
   approveReservation(reservationId: number): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservationsService.acceptReservation(reservationId).subscribe(
      (response: any) => {
        // Afficher l'alerte SweetAlert2 en cas de succès
        Swal.fire({
          title: 'Réservation approuvée!',
          text: 'La réservation a été approuvée avec succès. Veuillez consulter la liste des reservations pour voir les changements.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        // Actualiser la liste des réservations
        this.getReservation(id);
      },
      (error: any) => {
        // Afficher l'alerte SweetAlert2 en cas d'erreur
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors de l\'approbation de la réservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
  
        // Afficher l'erreur dans la console
        //console.error('Reservation Error:', error);
      }
    );
  }

  // Méthode pour désapprouver une reservation
  rejectReservation(reservationId: number): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reservationsService.refuserReservation(reservationId).subscribe(
      (response: any) => {
        // Afficher l'alerte SweetAlert2 en cas de succès
        Swal.fire({
          title: 'Réservation désapprouvée!',
          text: 'La réservation a été désapprouvée avec succès. Veuillez consulter la liste des reservations pour voir les changements.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
        // Actualiser la liste des réservations
        this.getReservation(id);
      },
      (error: any) => {
        // Afficher l'alerte SweetAlert2 en cas d'erreur
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur s\'est produite lors du rejet de la réservation.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
  
        // Afficher l'erreur dans la console
        //console.error('Reservation Error:', error);
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
  

  
}
