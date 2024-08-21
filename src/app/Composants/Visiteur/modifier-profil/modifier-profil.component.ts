import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';
import { ModelProfil } from '../../../Models/profil.model';
import { ProfilService } from '../../../Services/profil.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modifier-profil',
  standalone: true,
  imports: [RouterOutlet,Header2Component,FooterComponent, Header1Component,CommonModule,FormsModule],
  templateUrl: './modifier-profil.component.html',
  styleUrl: './modifier-profil.component.css'
})
export class ModifierProfilComponent {
userProfil:ModelProfil={};
constructor(private userService: ProfilService, private router: Router) {} 
ngOnInit(): void {
  const token = localStorage.getItem('access_token'); // Assurez-vous que c'est 'access_token'
  if (token) {
    this.userService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfil = data;
        console.log('Profil utilisateur récupéré:', this.userProfil); // Ajoutez ce log pour vérifier les données
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
      }
    );
  } else {
    console.error('No token found in localStorage');
  }
}

updateProfil(){
  this.userService.updateUserProfile(this.userProfil).subscribe(
    (Response:any)=>{
      console.log('profil mis à jour avec succés',Response);
      this.router.navigate(['/profil-entrepreneur']); 
    },
    (error:any)=>{
      console.error('Error lors de la mis à jour du profil',error);
        }
  );
}
}
