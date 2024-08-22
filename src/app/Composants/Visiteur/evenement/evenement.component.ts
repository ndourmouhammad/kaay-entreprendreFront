import { RouterLink, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Evenement } from '../../../Models/evenements.model';
import { EvenementService } from '../../../Services/evenement.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterLink,
    RouterModule,
    CommonModule
  ],
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css'],
  providers: [DatePipe]
})
export class EvenementComponent implements OnInit {
  evenements: Evenement[] = []; // Utilisation du type Evenement

  constructor(
    private evenementService: EvenementService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(
      (data: Evenement[]) => {
        this.evenements = data;
        console.log(this.evenements);
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );
  }
}
