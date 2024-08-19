import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajout-evenement',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './ajout-evenement.component.html',
  styleUrl: './ajout-evenement.component.css'
})
export class AjoutEvenementComponent {

}
