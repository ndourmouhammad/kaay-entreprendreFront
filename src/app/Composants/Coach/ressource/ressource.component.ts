import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
  ],
  templateUrl: './ressource.component.html',
  styleUrl: './ressource.component.css'
})
export class RessourceComponent {

}
