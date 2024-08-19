import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
// import { AcceuilComponent } from '../../AccueilComponant/acceuil/acceuil.component';
import { AcceuilComponent } from '../../Visiteur/acceuil/acceuil.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet,
    AcceuilComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
