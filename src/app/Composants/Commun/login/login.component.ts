import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/users.model';
import { Role } from '../../../Models/roles.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    FormsModule,
    NgIf
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
  loginError: boolean = false;

  // Declaration des méthodes
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

          if (response.user.roles) {
            if (response.user.roles.some((role: Role) => role.name === 'admin')) {
              this.router.navigateByUrl('dashboard-admin');
            } else if (response.user.roles.some((role: Role) => role.name === 'coach')) {
              this.router.navigateByUrl('dashboard-coach');
            } else if (response.user.roles.some((role: Role) => role.name === 'entrepreneur')) {
              this.router.navigateByUrl('Acceuil');
            }
          } else {
            this.router.navigateByUrl('');
          }

          this.loginError = false; // Réinitialiser l'erreur de connexion
        }
      },
      (error) => {
        console.error(error);
        this.loginError = true; // Afficher le message d'erreur
      }
    );
  } else {
    this.loginError = true; // Afficher le message d'erreur si les champs sont vides
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
