import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-ressource-detail',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    HeaderCoachComponent
  ],
  templateUrl: './ressource-detail.component.html',
  styleUrl: './ressource-detail.component.css'
})
export class RessourceDetailComponent {

}
