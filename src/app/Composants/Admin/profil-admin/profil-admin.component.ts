import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';

@Component({
  selector: 'app-profil-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent
  ],
  templateUrl: './profil-admin.component.html',
  styleUrl: './profil-admin.component.css'
})
export class ProfilAdminComponent {

}
