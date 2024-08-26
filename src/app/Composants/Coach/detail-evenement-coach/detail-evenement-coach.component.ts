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
import Swal from 'sweetalert2';



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
        //console.log('Event Data:', response);
        this.event = response.data || {}; // Ensure event is assigned correctly
      },
      (error: any) => {
        //console.error('Event Error:', error);
      }
    );
  }


  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  
  reserveEvent(): void {
    const formData = new FormData();
    // Ajouter les données nécessaires à formData si nécessaire
    // Par exemple, si vous avez un champ de formulaire pour les détails de la réservation, incluez-le ici.
  
    if (this.event && this.event.id) {
      this.ReservationsService.addReservation(formData, this.event.id).subscribe(
        (response: any) => {
          // Afficher l'alerte SweetAlert2 en cas de succès
          Swal.fire({
            title: 'Réservation réussie!',
            text: 'Votre réservation a été effectuée avec succès. Veuillez consulter votre mail pour plus d\'informations.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
  
          // Autres actions en cas de succès, si nécessaire
          // Par exemple, rediriger l'utilisateur ou actualiser la liste des réservations
  
        },
        (error: HttpErrorResponse) => {
          // Afficher l'alerte SweetAlert2 en cas d'erreur
          Swal.fire({
            title: 'Échec de la réservation!',
            text: 'Une erreur s\'est produite lors de la réservation. Veuillez réessayer.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
  
          // Afficher l'erreur dans la console
          console.error('Reservation failed:', error);
        }
      );
    } else {
      // Afficher l'alerte SweetAlert2 si l'ID de l'événement n'est pas disponible
      Swal.fire({
        title: 'Erreur!',
        text: 'L\'ID de l\'événement n\'est pas disponible.',
  
      });
    }
  }
}
