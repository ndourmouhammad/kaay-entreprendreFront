import { Component } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule
  ],
  templateUrl: './dashboard-coach.component.html',
  styleUrl: './dashboard-coach.component.css'
})
export class DashboardCoachComponent {

}
