import { Component, inject, OnInit } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RouterModule } from '@angular/router';
import { RessourceModel } from '../../../Models/ressources.models';
import { RessourcesService } from '../../../Services/ressources.service';
import { CategorieService } from '../../../Services/categorie.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { CategorieModel } from '../../../Models/categories.model';

@Component({
  selector: 'app-ressource',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    RouterModule,
    NgFor,
    NgIf,
    SlicePipe
  ],
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  private ressourcesService = inject(RessourcesService);
  private categorieService = inject(CategorieService);

  ressources: RessourceModel[] = [];
  categories: CategorieModel[] = [];
  baseUrl: string = environment.apiUrl;

  ngOnInit(): void {
    this.loadCategories();
    this.loadRessources();
  }
  
  private loadCategories(): void {
    this.categorieService.getCategories().subscribe((response) => {
      if (response && Array.isArray(response.data)) {
        this.categories = response.data;
        this.loadRessources(); // Recharger les ressources après avoir les catégories
      } else {
        console.error('Unexpected response format for categories:', response);
      }
    });
  }
  
  
  private loadRessources(): void {
    this.ressourcesService.getRessources().subscribe((response) => {
      console.log('Resources Response:', response);
      if (response && Array.isArray(response)) {
        this.ressources = response;
        console.log('Ressources Loaded:', this.ressources);
      } else {
        console.error('Unexpected response format for resources:', response);
      }
    });
  }
  

  getCategoryTitle(categoryId: number | undefined): string {
    if (categoryId === undefined) {
      console.warn('Category ID is undefined');
      return 'Catégorie inconnue';
    }
  
    const category = this.categories.find(cat => cat.id === categoryId);
  
    if (!category) {
      console.warn(`No category found for ID: ${categoryId}`);
      return 'Catégorie inconnue';
    }
  
    return category.titre ?? 'Catégorie inconnue';
  }
  
  
  

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
