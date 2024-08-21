import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';
import { ProfilService } from '../../../Services/profil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ 
    RouterOutlet,
    Header2Component,
    FooterComponent,
    RouterLink,
    RouterModule,
    Header1Component,
    CommonModule
  ],
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  userProfil: any;
  resvation:any;
  constructor(private userService: ProfilService, private router: Router) {} // Injection correcte du Router

  ngOnInit(): void {
    const token = localStorage.getItem('access_token'); 
  
    if (token) {
      // Récupérer le profil de l'utilisateur
      this.userService.getUserProfile().subscribe(
        (data: any) => {
          this.userProfil = data;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
        }
      );
  
      // Récupérer les réservations de l'utilisateur
      this.userService.getmesreservation().subscribe(
        (data: any) => {
          console.log('Réservations:', data); // Vérifiez la structure ici
          this.resvation = Array.isArray(data) ? data : data.reservations; // Ajustez si nécessaire
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des réservations:', error);
        }
      );
    }    
  }
  
  goToEdit() {
    if (this.userProfil && this.userProfil.id) {
      this.router.navigate(['/modifier-profil', this.userProfil.id]); 
    } else {
      console.error('Profil non défini ou ID non disponible');
    }
  }
  
 
}
