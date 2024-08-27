import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  imports: [RouterOutlet, FooterComponent, Header1Component, CommonModule, FormsModule],
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent implements OnInit {
  userProfil: ModelProfil = {};
  tabSecteur: secteurModel[] = [];
  photoFile: File | null = null;
cvFile: File | null = null;

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
      (data: any) => {
        console.log('Données du profil reçues:', data);
        // Accéder à l'objet `user` pour obtenir l'ID
        if (data.user && data.user.id) {
          this.userProfil = data.user;
          console.log('ID de l\'utilisateur connecté:', this.userProfil.id);
        } else {
          console.warn('Aucun ID d\'utilisateur trouvé dans les données du profil.');
        }
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
        
        if (Array.isArray(response)) {
          this.tabSecteur = response;  // Assuming response is already an array
          console.log('Secteurs récupérés:', this.tabSecteur);
        } else {
          console.error('Les données reçues ne sont pas un tableau:', response);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des secteurs:', error);
      }
    );
  }
  
  
  
  
  
  
  updateProfil(): void {
    const photo = this.photoFile || undefined;
    const cv = this.cvFile || undefined;
  
    this.userService.updateUserProfile(this.userProfil, photo, cv).subscribe(
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
  
  onFileSelected(event: Event, type: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (type === 'photo') {
        this.photoFile = input.files[0];
      } else if (type === 'cv') {
        this.cvFile = input.files[0];
      }
    }
  }
  
  
}
