import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from '../headerFooter/header1/header1.component';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [RouterOutlet,Header1Component],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent {

}
