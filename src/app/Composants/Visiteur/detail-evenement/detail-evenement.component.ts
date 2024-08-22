import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evenement } from '../../../Models/evenements.model';
import { EvenementService } from '../../../Services/evenement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-evenement',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './detail-evenement.component.html',
  styleUrls: ['./detail-evenement.component.css']
})
export class DetailEvenementComponent implements OnInit {
  evenementId: number | null = null;
  evenementDetails: Evenement | null = null;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) {}

  ngOnInit(): void {
    this.evenementId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.evenementId) {
      this.evenementService.getEvenement(this.evenementId).subscribe(
        (evenement: Evenement) => {
          console.log('Détails de l\'événement:', evenement); // Ajoutez ce log pour vérifier les données
          this.evenementDetails = evenement;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'événement', error);
        }
      );
    }
  }
    // Méthode pour générer le chemin complet de l'image
    getPhotoUrl(photo: string): string {
      return `assets/images/${photo}`; // Assurez-vous que le chemin est correct
    }
  }

