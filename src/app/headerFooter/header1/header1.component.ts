import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {

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
