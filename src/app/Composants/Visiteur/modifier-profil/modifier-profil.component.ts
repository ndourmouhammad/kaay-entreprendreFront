import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';

@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [RouterOutlet,Header2Component,FooterComponent, Header1Component],
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css'
})
export class ModifierProfilComponent {

}
