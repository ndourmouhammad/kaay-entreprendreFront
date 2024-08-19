import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-demandecoach',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent
  ],
  templateUrl: './demandecoach.component.html',
  styleUrl: './demandecoach.component.css'
})
export class DemandecoachComponent {

}
