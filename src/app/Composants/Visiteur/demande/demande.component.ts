import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './../../../Services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../Models/users.model';
import { CoachService } from '../../../Services/coach.service';
import { Observable } from 'rxjs';
import { SecteurActiviteModel } from '../../../Models/secteuractivite.model';
import { environment } from '../../../../environnements/environments';


@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    RouterLink, CommonModule
  ],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent implements OnInit {
  secteurs: SecteurActiviteModel[] = [];
  coaches: UserModel[] = [];
  selectedCoach?: UserModel;
  selectedSecteurId?: number;
  baseUrl: string = environment.apiUrl;

  constructor(private coacheServices: CoachService) {}

  ngOnInit(): void {
    this.loadSecteurs();
    this.coacheServices.getCoaches().subscribe({
      next: (users: UserModel[]) => {
        this.coaches = users;
        console.log(this.coaches); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des coaches', err);
      }
    });
  }
  loadSecteurs(): void {
    this.coacheServices.getSecteures().subscribe({
      next: (secteurs) => {
        this.secteurs = secteurs;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des secteurs', err);
      }
    });
  }
  onSecteurClick(secteurId: number | undefined): void {
    if (secteurId !== undefined) {
      this.coacheServices.getCoachesBySecteur(secteurId).subscribe({
        next: (coaches: UserModel[]) => {
          this.coaches = coaches;
          console.log('coach',this.coaches)
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des coaches', err);
        }
      });
    } else {
      console.error('Secteur ID est indéfini');
    }
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
 
}