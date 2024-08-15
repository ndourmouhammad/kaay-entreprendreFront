import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-dashboard-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent
  ],
  templateUrl: './dashboard-coach.component.html',
  styleUrl: './dashboard-coach.component.css'
})
export class DashboardCoachComponent {

}
