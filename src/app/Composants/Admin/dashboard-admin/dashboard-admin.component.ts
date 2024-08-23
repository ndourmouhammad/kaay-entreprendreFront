import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

}
