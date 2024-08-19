import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  // Injection des dépendances
  private authService = inject(AuthService);
  private router = inject(Router);

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
