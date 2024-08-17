import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-coach',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './header-coach.component.html',
  styleUrl: './header-coach.component.css'
})
export class HeaderCoachComponent {

}
