import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-ressource-form',
  standalone: true,
  imports: [
    RouterModule,
    HeaderCoachComponent
  ],
  templateUrl: './ressource-form.component.html',
  styleUrl: './ressource-form.component.css'
})
export class RessourceFormComponent {

}
