import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
// import { Header2Component } from '../headerFooter/header2/header2.component';
// import { FooterComponent } from '../headerFooter/footer/footer.component';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ 
    RouterOutlet,
    Header2Component,
    FooterComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

}
