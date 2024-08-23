import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-evenement-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './evenement-admin.component.html',
  styleUrl: './evenement-admin.component.css'
})
export class EvenementAdminComponent {

}
