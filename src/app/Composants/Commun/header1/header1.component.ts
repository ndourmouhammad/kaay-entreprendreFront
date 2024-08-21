import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header1',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
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

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/Acceuil']);
        this.authService.setLoggedIn(false); // Assurez-vous de mettre à jour l'état
        window.location.reload()
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Nettoyer les abonnements
  }
}
