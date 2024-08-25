import { Component, OnInit, inject } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { UserModel } from '../../../Models/users.model';
import { UsersService } from '../../../Services/users.service';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { throwError, catchError } from 'rxjs';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profil-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    NgIf,
    RouterLink,
    RouterModule
  ],
  templateUrl: './profil-admin.component.html',
  styleUrl: './profil-admin.component.css'
})
export class ProfilAdminComponent implements OnInit {

    // Injection des dépendances
    private usersService = inject(UsersService);
    private router = inject(Router);

    user: UserModel = {};
    baseUrl: string = environment.apiUrl;
    photoUrl: string = '';

    ngOnInit(): void {
        // Afficher les informations de l'utilisateur connecté
        this.getMe();
    }

    // Afficher les informations de l'utilisateur connecté
    getMe(): void {
      this.usersService.getMe().pipe(
          catchError(error => {
              console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
              return throwError(error);
          })
      ).subscribe(
          response => {
              console.log('Réponse de l\'API:', response);
              if (response && response.user) {
                  if (response.user !== null) {
                      this.user = response.user;
                      this.photoUrl = `${this.baseUrl}${this.user.photo}`;
                  } else {
                      console.warn('Aucun utilisateur trouvé.');
                      this.user = {
                          name: 'Utilisateur non trouvé',
                          telephone: 'Non spécifié',
                          email: 'Non spécifié',
                          adresse: 'Non spécifié',
                          photo: ''
                      };
                  }
              } else {
                  console.warn('Données utilisateur manquantes dans la réponse');
                  this.user = {
                      name: 'Utilisateur inconnu',
                      telephone: 'Non spécifié',
                      email: 'Non spécifié',
                      adresse: 'Non spécifié',
                      photo: ''
                  };
              }
          },
          error => {
              console.error('Erreur lors de la récupération de l\'utilisateur connecté:', error);
          }
      );
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  
}
