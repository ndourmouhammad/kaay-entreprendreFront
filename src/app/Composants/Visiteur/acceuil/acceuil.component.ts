import { RetourExperienceService } from './../../../Services/retourExperience.service';
import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { retourExperienceModel } from '../../../Models/retourExperience.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterOutlet,Header1Component,FooterComponent, RouterLink, RouterModule,CommonModule
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})

export class AcceuilComponent implements AfterViewInit, OnInit {
  cards = [
    { title: 'Comment Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
    { title: 'Comment Card 2', content: 'Vestibulum nunc massa, gravida quis porta nec, feugiat id metus...' },
    { title: 'Comment Card 3', content: 'Donec nunc ligula, vulputate quis mollis eu, interdum quis libero...' },
    { title: 'Comment Card 4', content: 'Donec nunc ligula, vulputate quis mollis eu, interdum quis libero...' }
  ];
  
  private retourExperienceService=inject(RetourExperienceService);
  tabRetourExperience:retourExperienceModel[]=[];
  private currentIndex = 0;

  ngAfterViewInit(): void {
    this.setupCardRotation();
  }

  setupCardRotation() {
    const cards = document.querySelectorAll('.card');
    if (cards.length) {
      cards[this.currentIndex].classList.add('card--current');
      cards.forEach((card, index) => {
        card.addEventListener('click', () => this.rotateCards(index));
      });
    }
  }

  rotateCards(index: number) {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, cardIndex) => {
      card.classList.remove('card--current', 'card--out', 'card--next');
      if (cardIndex === index) {
        card.classList.add('card--current');
        this.currentIndex = index;
      } else if (cardIndex === (index + 1) % cards.length) {
        card.classList.add('card--next');
      } else {
        card.classList.add('card--out');
      }
    });
  }

  getCardClasses(index: number): string {
    if (index === this.currentIndex) {
      return 'card card--current';
    } else if (index === (this.currentIndex + 1) % this.cards.length) {
      return 'card card--next';
    } else {
      return 'card card--out';
    }
  }
  ngOnInit(): void {
    this.fetchRetourExperience();
  }
  fetchRetourExperience() {
    this.retourExperienceService.getRetourExperiences().subscribe(
      (response: any) => {
        if (Array.isArray(response.data)) {
          console.log('retour_experiences:', response.data);
          this.tabRetourExperience = response.data.reverse();
        } else {
          console.error('API response does not contain an array in the "data" field:', response);
        }
      },
      (error) => {
        console.error('Error fetching retourExperience:', error);
      }
    );
  }
  
}
