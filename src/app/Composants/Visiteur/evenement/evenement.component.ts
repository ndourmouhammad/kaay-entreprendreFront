import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [
    EvenementComponent,
    Header1Component,
    FooterComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css'
})
export class EvenementComponent {

}
