import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from '../../headerFooter/header1/header1.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterOutlet,Header1Component],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
