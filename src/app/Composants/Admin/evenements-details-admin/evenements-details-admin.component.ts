import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evenements-details-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './evenements-details-admin.component.html',
  styleUrl: './evenements-details-admin.component.css'
})
export class EvenementsDetailsAdminComponent {

}
