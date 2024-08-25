import { Component, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RetourExperienceService } from '../../../Services/retourExperience.service';
import { RetourExperienceModel } from '../../../Models/retourExperience.models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environnements/environments';

@Component({
  selector: 'app-retour-experience-accueil',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterModule,
    RouterLink,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './retour-experience-accueil.component.html',
  styleUrl: './retour-experience-accueil.component.css'
})
export class RetourExperienceAccueilComponent implements OnInit{
  retourExperience: RetourExperienceModel[] = [];
  baseUrl: string = environment.apiUrl;

  constructor(private retourExperienceService: RetourExperienceService) {}

  ngOnInit(): void {
    this.getRetourExperience();
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  getRetourExperience(): void {
    this.retourExperienceService.getRetourExperiences().subscribe((data) => {
      this.retourExperience = data.data;
    });
  }


}
