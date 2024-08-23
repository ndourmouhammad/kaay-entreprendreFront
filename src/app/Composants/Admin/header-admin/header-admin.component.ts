import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {

  // Injection des dépendances
  private authService = inject(AuthService);
  private router = inject(Router);

  userName: string | null = '';

  ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userName = user?.name || 'Utilisateur';
  }

  logout() {
    return this.authService.logout().subscribe(
      (response: any) => {
        console.log(response);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
