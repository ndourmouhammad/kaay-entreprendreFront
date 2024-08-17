import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-profil-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent
  ],
  templateUrl: './profil-coach.component.html',
  styleUrl: './profil-coach.component.css'
})
export class ProfilCoachComponent {

}
