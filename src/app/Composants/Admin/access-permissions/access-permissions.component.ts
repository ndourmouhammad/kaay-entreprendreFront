import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-access-permissions',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './access-permissions.component.html',
  styleUrl: './access-permissions.component.css'
})
export class AccessPermissionsComponent {

}
