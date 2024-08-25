import { catchError } from 'rxjs';
import { Component, OnInit , inject} from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { UsersService } from '../../../Services/users.service';
import { UserModel } from '../../../Models/users.model';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-access-users-detail',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgIf
  ],
  templateUrl: './access-users-detail.component.html',
  styleUrl: './access-users-detail.component.css'
})
export class AccessUsersDetailComponent implements OnInit {

  // Injection des dépépendances
  private userService = inject(UsersService)
  private route : ActivatedRoute = inject(ActivatedRoute)


  baseUrl: string = environment.apiUrl;
  user: UserModel = {};

  ngOnInit(): void {
    // Récupérez l'ID depuis les paramètres de la route
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser(id);
  }

  // Afficher les details d'un seul user
  getUser(id: number): void {
    this.userService.getUser(id).subscribe(
      (response: any) => {
        this.user = response.data; // Assurez-vous d'adapter selon la structure de la réponse
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

   // Méthode pour activer/désactiver l'utilisateur
   toggleStatus(): void {
    const id = this.user.id;
  
    if (id === undefined || id === null) {
      console.error('User ID is not defined.');
      return;
    }
  
    const newStatus = !this.user.statut; // Inverse le statut actuel
  
    if (newStatus) {
      this.userService.activateUser(id).pipe(
        catchError(error => {
          console.error('Erreur lors de l\'activation:', error);
          return throwError(error);
        })
      ).subscribe(
        response => {
          this.user.statut = newStatus; // Met à jour l'interface après succès
          console.log('Utilisateur activé:', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Utilisateur activé",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Erreur lors de l\'activation:', error);
        }
      );
    } else {
      this.userService.deactivateUser(id).pipe(
        catchError(error => {
          console.error('Erreur lors de la désactivation:', error);
          return throwError(error);
        })
      ).subscribe(
        response => {
          this.user.statut = newStatus; // Met à jour l'interface après succès
          console.log('Utilisateur désactivé:', response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Utilisateur désactivé:",
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Erreur lors de la désactivation:', error);
        }
      );
    }
  }
  

 getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

}
