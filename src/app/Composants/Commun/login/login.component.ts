import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { UserModel } from '../../../Models/users.model';
import { Role } from '../../../Models/roles.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    FormsModule,CommonModule
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
  errorMessage: string = '';  // Variable pour stocker les messages d'erreur

  // Declaration des méthodes
  login() {
    this.errorMessage = '';  // Réinitialise le message d'erreur à chaque tentative de connexion

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
          this.errorMessage ="";
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Échec de la connexion. Vérifiez vos informations d\'identification.",
            footer: '<a href="#">Pourquoi ai-je ce problème ?</a>'
          });  // Message d'erreur
        }
      );
    } else {
      this.errorMessage = '';  // Message d'erreur si les champs sont vides
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer un email et un mot de passe.",
        footer: '<a href="#">Pourquoi ai-je ce problème ?</a>'
      });  // Message d'erreur
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
