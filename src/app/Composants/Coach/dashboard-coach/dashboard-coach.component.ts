import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    RouterLink
  ],
  templateUrl: './dashboard-coach.component.html',
  styleUrl: './dashboard-coach.component.css'
})
export class DashboardCoachComponent {

}
