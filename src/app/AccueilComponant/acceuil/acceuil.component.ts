import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from '../../headerFooter/header1/header1.component';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterOutlet,Header1Component ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})

export class AcceuilComponent {

}
