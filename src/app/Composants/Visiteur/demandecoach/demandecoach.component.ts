import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { UserModel } from '../../../Models/users.model';
import { CoachService } from '../../../Services/coach.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecteurActiviteModel } from '../../../Models/secteuractivite.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environnements/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandecoach',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent, 
    CommonModule
  ],
  templateUrl: './demandecoach.component.html',
  styleUrls: ['./demandecoach.component.css']
})
export class DemandecoachComponent implements OnInit {
  coach: any;
  message: string = ''; // Message à envoyer
  selectedCoachId?: number; // ID du coach sélectionné
  baseUrl: string = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const coachId = this.route.snapshot.paramMap.get('id');
    if (coachId) {
      this.coachService.getCoachById(Number(coachId)).subscribe({
        next: (coach: UserModel) => {
          this.coach = coach;
          this.selectedCoachId = coach.id; // Assigner l'ID du coach sélectionné
          console.log(this.coach); 
        },
        
        error: (err) => {
          console.error('Erreur lors de la récupération des détails du coach', err);
        }
      });
    }
  }

  sendRequest(): void {
    if (this.coach) {
      this.coachService.demanderAccompagnement(this.coach.id).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Demande envoyée',
            text: 'Demande d\'accompagnement envoyée avec succès!',
            confirmButtonText: 'OK'
          });
        },
        error => {
          //console.error('Erreur lors de l\'envoi de la demande', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de l\'envoi de la demande.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Aucun coach sélectionné',
        text: 'Aucun coach sélectionné.',
        confirmButtonText: 'OK'
      });
    }
  }
  

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  
}