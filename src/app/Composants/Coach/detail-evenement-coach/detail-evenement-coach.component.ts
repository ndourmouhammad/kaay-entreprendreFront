import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail-evenement-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    RouterLink
  ],
  templateUrl: './detail-evenement-coach.component.html',
  styleUrl: './detail-evenement-coach.component.css'
})
export class DetailEvenementCoachComponent {

}
