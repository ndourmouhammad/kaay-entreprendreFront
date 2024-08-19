import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ RouterOutlet,
    Header2Component,
    FooterComponent,
    RouterLink,
    RouterModule,
    Header1Component
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

}
