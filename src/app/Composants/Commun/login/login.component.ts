import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/users.model';
import { Role } from '../../../Models/roles.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Injection des dépendances
  private authService = inject(AuthService);
  private router = inject(Router);

  // Declaration des variables
  userObject: UserModel = {};

  // Declaration des méthodes
  login() {
    if (this.userObject.email && this.userObject.password) {
      this.authService.login(this.userObject).subscribe(
        (response: any) => {
          console.log(response.access_token);
          console.log(response.user);

          if (response.user) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log(localStorage.getItem('user'));
            // si role = 'admin' ->dashboard/admin ou role = 'super_admin ->dashboard/super-admin ou role = 'entrepreneur ->dashboard/entrepreneur

            if (response.user.roles) {
              if (response.user.roles.some((role: Role) => role.name === 'admin')) {
                this.router.navigateByUrl('dashboard-admin');
              }
              else if (response.user.roles.some((role: Role) => role.name ==='coach')) {
                this.router.navigateByUrl('dashboard-coach');
              }
              else if (response.user.roles.some((role: Role) => role.name === 'entrepreneur')) {
                this.router.navigateByUrl('Acceuil');
              }
            }
            else {
              this.router.navigateByUrl('');
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
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
