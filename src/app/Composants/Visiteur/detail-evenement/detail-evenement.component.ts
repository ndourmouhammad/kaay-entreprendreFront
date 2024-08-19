import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-detail-evenement',
  standalone: true,
  imports: [
    DetailEvenementComponent,
    Header1Component,
    FooterComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './detail-evenement.component.html',
  styleUrl: './detail-evenement.component.css'
})
export class DetailEvenementComponent {

}
