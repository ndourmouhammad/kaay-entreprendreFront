import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-roles',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './access-roles.component.html',
  styleUrl: './access-roles.component.css'
})
export class AccessRolesComponent {

}
