import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evenement-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    RouterLink
  ],
  templateUrl: './evenement-coach.component.html',
  styleUrl: './evenement-coach.component.css'
})
export class EvenementCoachComponent {

}
