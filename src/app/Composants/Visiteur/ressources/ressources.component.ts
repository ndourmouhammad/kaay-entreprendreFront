import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header2Component } from '../../Commun/header2/header2.component';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [
    RouterOutlet,
    Header1Component,
    FooterComponent,
    Header2Component,
    RouterLink,
    RouterModule
  ],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent {

}
