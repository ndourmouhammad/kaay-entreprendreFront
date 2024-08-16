import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ressource-detail',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './ressource-detail.component.html',
  styleUrl: './ressource-detail.component.css'
})
export class RessourceDetailComponent {

}
