import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header2Component } from '../../Commun/header2/header2.component';
import { RessourceService } from '../../../Services/ressource.service';
import { ModelRessource } from '../../../Models/ressource.model';
import { CommonModule } from '@angular/common';
import { ModelCategorie } from '../../../Models/catégorie.model';
import { CategorieService } from '../../../Services/categorie.service';

@Component({
  selector: 'app-ressources',
  standalone: true,
  imports: [
    RouterOutlet,
    Header1Component,
    FooterComponent,
    Header2Component,
    RouterLink,
    RouterModule,CommonModule
  ],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent implements OnInit {
  // Injection de dependances 
private ressourceService=inject(RessourceService);
private categorieService=inject(CategorieService);
 // Declaration des variables 
 tabRessources:ModelRessource[]=[];
 tabCategorie:ModelCategorie[] = [];
 categorieObject:ModelCategorie={}
 selectedCategorieId:number | null=null;
 ngOnInit(): void {
   this.fetchRessoureces();
   this.fetchCategorie();
 }
fetchRessoureces() {
  this.ressourceService.getAllRessource().subscribe(
    (response: any) => {
      if (Array.isArray(response)) {
        console.log('Ressources:', response);  
        this.tabRessources = response.reverse().slice(0, 6);
      } else {
        console.error('API response is not an array:', response);
      }
    },
    (error) => {
      console.error('Error fetching resources:', error);
    }
  );
};
fetchCategorie() {
  this.categorieService.getAllCategorie().subscribe(
    (response: any) => {
      if (response && response.data) {
        this.tabCategorie = response.data; // Utiliser 'response.data' pour obtenir la liste des catégories
        console.log('categorie',this.tabCategorie);
      } else {
        console.error('La réponse de l\'API ne contient pas une liste de catégories:', response);
      }
    },
    error => {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  );
}
//recuperer la catégorie selectionner
fetchRessources(categorieId?: number) {
  if (categorieId) {
    this.ressourceService.getRessourcesByCategorie(categorieId).subscribe(
      (response: any) => {
        if (response && response.data) {
          this.tabRessources = response.data;
          console.log(this.tabRessources);
        } else {
          console.error('La réponse de l\'API ne contient pas une liste de ressources:', response);
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des ressources:', error);
      }
    );
  } else {
    this.ressourceService.getAllRessource().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          console.log('Ressources:', response);
          this.tabRessources = response.reverse().slice(0, 6);
        } else {
          console.error('API response is not an array:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching resources:', error);
      }
    );
  }
}
onCategorieClick(categorieId: number | undefined) {
  if (categorieId !== undefined) {
    this.selectedCategorieId = categorieId;
    this.fetchRessources(categorieId);
  } else {
    console.error('ID de catégorie non défini');
  }
}

}
