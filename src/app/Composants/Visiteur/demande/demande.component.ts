import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    RouterLink
  ],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})
export class DemandeComponent {

}
