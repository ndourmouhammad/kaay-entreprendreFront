import { AuthService } from './../../../Services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { UserModel } from '../../../Models/users.model';
import { CoachService } from '../../../Services/coach.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SecteurActiviteModel } from '../../../Models/secteuractivite.model';

@Component({
  selector: 'app-demandecoach',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,CommonModule
  ],
  templateUrl: './demandecoach.component.html',
  styleUrl: './demandecoach.component.css'
})
export class DemandecoachComponent implements OnInit {
  coach?: UserModel;

  constructor(
    private route: ActivatedRoute,
    private coachService: CoachService
  ) {}

  ngOnInit(): void {
    const coachId = this.route.snapshot.paramMap.get('id');
    if (coachId) {
      this.coachService.getCoachById(Number(coachId)).subscribe({
        next: (coach: UserModel) => {
          this.coach = coach;
          console.log(this.coach); // Vérifie les données dans la console
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails du coach', err);
        }
      });
    }
  }
}
