import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

}
