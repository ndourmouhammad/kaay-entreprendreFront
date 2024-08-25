import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-retour-experience-accueil',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent
  ],
  templateUrl: './retour-experience-accueil.component.html',
  styleUrl: './retour-experience-accueil.component.css'
})
export class RetourExperienceAccueilComponent {

}
