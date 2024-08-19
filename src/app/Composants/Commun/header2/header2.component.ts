import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterModule
  ],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
// Déclarations des variables
private hamburgerMenu: HTMLElement | null = null;
private navbar: HTMLElement | null = null;

ngOnInit(): void {
  // Sélectionne le menu hamburger et la barre de navigation
  this.hamburgerMenu = document.querySelector('.hamburger-menu');
  this.navbar = document.querySelector('.navbar');

  // Ajoute un écouteur d'événements pour le clic sur le menu hamburger
  if (this.hamburgerMenu && this.navbar) {
    this.hamburgerMenu.addEventListener('click', () => {
      if (this.navbar) { 
        this.navbar.classList.toggle('active');
      }
      if (this.hamburgerMenu) { 
        this.hamburgerMenu.classList.toggle('open');
      }
    });
  }
}
}
