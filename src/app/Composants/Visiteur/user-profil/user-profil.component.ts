import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
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
  styleUrls: ['./user-profil.component.css']  // Correction ici
})
export class UserProfilComponent implements OnInit {
  userProfil: any;

  constructor(private userService: ProfilService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token'); // Assure-toi que c'est 'access_token'
    if (token) {
      this.userService.getUserProfile().subscribe(
        (data: any) => {
          this.userProfil = data;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
        }
      );
    } else {
      console.error('No token found in localStorage');
    }
  }
}
