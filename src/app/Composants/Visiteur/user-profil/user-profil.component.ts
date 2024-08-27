import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';
import { ProfilService } from '../../../Services/profil.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environnements/environments';
import { UserModel } from '../../../Models/users.model';
import { UsersService } from '../../../Services/users.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ 
    RouterOutlet,

    FooterComponent,
    RouterLink,
    RouterModule,
    Header1Component,
    NgIf,
    NgFor,
    DatePipe
  ],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent implements OnInit {
  userProfil: any;
  resvation:any;
  constructor(private userService: ProfilService, private router: Router, private userService1: UsersService) {} // Injection correcte du Router

  user: UserModel = {};
    baseUrl: string = environment.apiUrl;
    photoUrl: string = '';
  ngOnInit(): void {
    // Afficher les informations de l'utilisateur connecté
    this.getMe();
    this.userService.getmesreservation().subscribe(
      (data: any) => {
        console.log('Réservations:', data); // Vérifiez la structure ici
        this.resvation = data.data; // Ajustez si nécessaire
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    );
  }
  
  // Afficher les informations de l'utilisateur connecté
  getMe(): void {
    this.userService1.getMe().pipe(
        catchError(error => {
            console.error('Erreur lors de la sélection de l\'utilisateur connecté:', error);
            return throwError(error);
        })
    ).subscribe(
        response => {
            console.log('Réponse de l\'API:', response);
            if (response && response.user) {
                if (response.user !== null) {
                    this.userProfil = response.user;
                    this.photoUrl = `${this.baseUrl}${this.userProfil.photo}`;
                } else {
                    console.warn('Aucun utilisateur sélectionné.');
                    this.userProfil = {
                        name: 'Utilisateur non sélectionné',
                        telephone: 'Non sélectionné',
                        email: 'Non sélectionné',
                        adresse: 'Non sélectionné',
                        photo: ''
                    };
                }
            } else {
                console.warn('Données utilisateur manquantes dans la sélection');
                this.userProfil = {
                    name: 'Utilisateur inconnu',
                    telephone: 'Non sélectionné',
                    email: 'Non sélectionné',
                    adresse: 'Non sélectionné',
                    photo: ''
                };
            }
        },
        error => {
            console.error('Erreur lors de la sélection de l\'utilisateur connecté:', error);
        }
    );
  }

  
  
  goToEdit() {
    if (this.userProfil && this.userProfil.id) {
      this.router.navigate(['/modifier-profil', this.userProfil.id]); 
    } else {
      console.error('Profil non défini ou ID non disponible');
    }
  }
  
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
 
}


/*
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
*/