import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from './headerFooter/header1/header1.component';
<<<<<<< HEAD
import { AccueilComponent } from './accueilcomponent/accueil/accueil.component';

=======
import { Header2Component } from './headerFooter/header2/header2.component';
>>>>>>> 476dea518c5acbecfd58299e192453cab4b56df6

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet,Header1Component,AccueilComponent
=======
  imports: [RouterOutlet,Header1Component,Header2Component 
>>>>>>> 476dea518c5acbecfd58299e192453cab4b56df6
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kaay-entreprendre-front';
}
