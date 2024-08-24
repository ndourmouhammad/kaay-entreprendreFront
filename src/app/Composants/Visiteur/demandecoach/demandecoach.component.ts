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
  coach?: UserModel;
  message: string = ''; // Message à envoyer
  selectedCoachId?: number; // ID du coach sélectionné

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

  // Méthode pour envoyer la demande d'accompagnement
  sendRequest(): void {
    if (this.selectedCoachId && this.message) {
      const requestData = {
        message: this.message
      };

      this.http.post(`/api/demanderAccompagnementPersonnalise/${this.selectedCoachId}`, requestData)
        .subscribe({
          next: () => {
            alert('Demande d\'accompagnement envoyée avec succès.');
            this.message = ''; // Réinitialiser le message
          },
          error: (err) => {
            console.error('Erreur lors de l\'envoi de la demande', err);
          }
        });
    } else {
      alert('Veuillez entrer un message.'); // Validation
    }
  }
  
}
