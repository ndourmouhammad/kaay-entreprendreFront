import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RessourceModel } from '../../../Models/ressources.models';
import { RessourcesService } from '../../../Services/ressources.service';
import { CategorieService } from '../../../Services/categorie.service';
import { DatePipe, NgFor, NgIf, SlicePipe } from '@angular/common';
import { environment } from '../../../../environnements/environments';
import { CategorieModel } from '../../../Models/categories.model';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';

@Component({
  selector: 'app-ressource-detail',
  standalone: true,
  imports: [
    RouterModule,
    NgFor,
    NgIf,
    SlicePipe,
    DatePipe,
    HeaderCoachComponent
  ],
  templateUrl: './ressource-detail.component.html',
  styleUrls: ['./ressource-detail.component.css']
})
export class RessourceDetailComponent implements OnInit {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private ressourcesService = inject(RessourcesService);
  private categorieService = inject(CategorieService);
  private router = inject(Router);

  ressource: RessourceModel = {};  // Initialiser correctement
  categorie: CategorieModel | undefined;
  baseUrl: string = environment.apiUrl;
  successMessage: string | undefined;
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.loadRessource();
  }

  private loadRessource(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      console.error('Invalid ID parameter');
      return;
    }
    this.ressourcesService.getRessource(id).subscribe(response => {
      // Adapter ici en fonction de la structure de la réponse
      this.ressource = response;
      if (this.ressource.categorie_id) {
        this.loadCategorie(this.ressource.categorie_id);
      }
    }, error => {
      console.error('Error loading resource:', error);
      this.errorMessages.push('Failed to load resource');
    });
  }

  private loadCategorie(categorieId: number): void {
    this.categorieService.getCategorie(categorieId).subscribe(response => {
      this.categorie = response;
    }, error => {
      console.error('Error loading category:', error);
      this.errorMessages.push('Failed to load category');
    });
  }

  getPhotoUrl(photoPath: string | undefined): string {
    return photoPath ? `${this.baseUrl}${photoPath}` : '';
  }

  getFileUrl(filePath: string | undefined): string {
    return filePath ? `${this.baseUrl}${filePath}` : '';
  }
}
