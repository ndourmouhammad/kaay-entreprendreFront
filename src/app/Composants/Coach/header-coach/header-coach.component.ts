// import { Component, inject } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
// import { AuthService } from '../../../Services/auth.service';


// @Component({
//   selector: 'app-header-coach',
//   standalone: true,
//   imports: [
//     RouterLink,
//     RouterLinkActive,
//     RouterModule
//   ],
//   templateUrl: './header-coach.component.html',
//   styleUrl: './header-coach.component.css'
// })
// export class HeaderCoachComponent {

//   // Injection des dépendances
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   logout() {
//     return this.authService.logout().subscribe(
//       (response: any) => {
//         console.log(response);
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('user');
//         this.router.navigateByUrl('/login');
//       },
//       (error) => {
//         console.error(error);
//       }
//     )
//   }

// }

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-header-coach',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './header-coach.component.html',
  styleUrls: ['./header-coach.component.css']
})
export class HeaderCoachComponent implements OnInit {

  // Injection des dépendances
  private authService = inject(AuthService);
  private router = inject(Router);

  userName: string | null = '';

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user?.name || 'Utilisateur'; // Default to 'Utilisateur' if name is not found
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
    );
  }
}

