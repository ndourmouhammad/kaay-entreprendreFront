import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-evenement-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent
  ],
  templateUrl: './evenement-coach.component.html',
  styleUrl: './evenement-coach.component.css'
})
export class EvenementCoachComponent {

}
