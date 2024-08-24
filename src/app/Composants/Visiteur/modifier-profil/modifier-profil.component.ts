import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';
import { ModelProfil } from '../../../Models/profil.model';
import { ProfilService } from '../../../Services/profil.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { secteurModel } from '../../../Models/seteur.model';
import { SecteurService } from '../../../Services/secteur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [RouterOutlet, Header2Component, FooterComponent, Header1Component, CommonModule, FormsModule],
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  userProfil: ModelProfil = {};
  tabSecteur: secteurModel[] = [];

  constructor(private userService: ProfilService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token'); // Assurez-vous que c'est 'access_token'
    if (token) {
      this.loadUserProfile();
      this.loadSecteurs(); // Chargez les secteurs
    } else {
      console.error('No token found in localStorage');
    }
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data: ModelProfil) => {
        this.userProfil = data;
        console.log('Profil utilisateur récupéré:', this.userProfil); // Ajoutez ce log pour vérifier les données
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
      }
    );
  }

  loadSecteurs(): void {
    this.userService.getSecteurs().subscribe(
      (response: any) => {
        console.log('Données reçues de l\'API:', response);
        
        if (Array.isArray(response.message)) {
          this.tabSecteur = response.message;
          console.log('Secteurs récupérés:', this.tabSecteur);
        } else {
          console.error('Les données reçues ne sont pas un tableau:', response.message);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des secteurs:', error);
      }
    );
  }
  
  
  
  
  updateProfil(): void {
    this.userService.updateUserProfile(this.userProfil).subscribe(
      (response: any) => {
        console.log('Profil mis à jour avec succès', response);
        this.router.navigate(['/profil-entrepreneur']);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }
  getLibelleSecteurActivite(profil: any): string {
    const secteurFound = this.tabSecteur.find((elt: secteurModel) => elt.id === profil.secteur_activite_id);
    return secteurFound ? secteurFound.libelle || 'Libellé inconnu' : 'Libellé inconnu';
  }
  
  
}
