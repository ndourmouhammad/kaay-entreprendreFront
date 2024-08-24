import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [Header1Component, RouterLink, RouterModule, CommonModule],
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit, OnDestroy {

  private hamburgerMenu: HTMLElement | null = null;
  private navbar: HTMLElement | null = null;
  isLoggedIn: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.hamburgerMenu = document.querySelector('.hamburger-menu');
    this.navbar = document.querySelector('.navbar');

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

    this.subscription.add(
      this.authService.isLoggedIn().subscribe(status => {
        this.isLoggedIn = status;
      })
    );
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Rediriger l'utilisateur après une déconnexion réussie ou forcée
        this.router.navigate(['/Acceuil']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
        // Redirection après l'échec de la déconnexion si nécessaire
        this.router.navigate(['/login']);
      }
    });
  }
  

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Nettoyer les abonnements
  }
}
