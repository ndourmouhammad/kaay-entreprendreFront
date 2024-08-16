import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from './headerFooter/header1/header1.component';
import { AccueilComponent } from './accueilcomponent/accueil/accueil.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Header1Component,AccueilComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kaay-entreprendre-front';
}
