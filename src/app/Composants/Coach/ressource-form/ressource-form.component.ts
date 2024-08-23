import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { RessourceModel } from '../../../Models/ressources.models';
import { RessourcesService } from '../../../Services/ressources.service';
import { NgFor, NgIf } from '@angular/common';
import { CategorieModel } from '../../../Models/categories.model';
import { CategorieService } from '../../../Services/categorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environnements/environments';

@Component({
  selector: 'app-ressource-form',
  standalone: true,
  imports: [
    RouterModule,
    HeaderCoachComponent,
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './ressource-form.component.html',
  styleUrl: './ressource-form.component.css'
})
export class RessourceFormComponent implements OnInit {

  private ressourcesService = inject(RessourcesService);
  private categorieService = inject(CategorieService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Pour accéder aux paramètres de l'URL

  ressourceForm: FormGroup;
  categories: CategorieModel[] = [];
  isEditMode: boolean = false; 
  currentResourceId: string | null = null; 
  existingContenu: string | null = null;
  existingImage: string | null = null;
  baseUrl: string = environment.apiUrl;
  photoUrl: string = '';

  constructor() {
    this.ressourceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie_id: ['', Validators.required],
      contenu: [null],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  
    // Vérifiez si nous sommes en mode modification
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.isEditMode = true;
        this.currentResourceId = idString; // Keep id as string
        const id = +idString; // Convert idString to number if needed
        this.loadResource(id); // Pass number to loadResource
      }
    });
  }
  
  

  // Récupération des catégories
  getCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  // Charger la ressource pour modification
  loadResource(id: number): void {
    this.ressourcesService.getRessource(id).subscribe({
      next: (response) => {
        if (response) { 
          console.log('Ressource:', response);
          const ressource = response; // Directly access the response object
  
          // Store the current files
          this.existingContenu = ressource.contenu;
          this.existingImage = ressource.image;
  
          // Patch the form with the existing resource data
          this.ressourceForm.patchValue({
            titre: ressource.titre,
            description: ressource.description,
            categorie_id: ressource.categorie_id,
            contenu: '', // Keep this empty, as the file input is handled separately
            image: '' // Same for the image
          });
        } else {
          console.error('Response is undefined or null', response);
        }
      },
      error: (err) => console.error('Erreur lors de la récupération de la ressource:', err)
    });
  }
  
  


  // Méthode pour soumettre le formulaire
// Méthode pour soumettre le formulaire
onSubmit(): void {
  if (this.ressourceForm.valid) {
    const formData = new FormData();

    // If a new file for 'contenu' is selected, add it to FormData
    const contenuControl = this.ressourceForm.get('contenu');
    if (contenuControl?.value && typeof contenuControl.value !== 'string') {
      formData.append('contenu', contenuControl.value);
    }

    // If a new image is selected, add it to FormData
    const imageControl = this.ressourceForm.get('image');
    if (imageControl?.value && typeof imageControl.value !== 'string') {
      formData.append('image', imageControl.value);
    }

    // Add other form fields
    Object.keys(this.ressourceForm.controls).forEach(key => {
      if (key !== 'contenu' && key !== 'image') { // Avoid duplicating file fields
        const value = this.ressourceForm.get(key)?.value;
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    if (this.isEditMode && this.currentResourceId) {
      // Update resource
      const resourceId = Number(this.currentResourceId);
      this.ressourcesService.updateRessource(formData, resourceId).subscribe({
        next: (response) => {
          console.log('Ressource modifiée avec succès', response);
          this.router.navigate(['/ressources-coach']);
        },
        error: (err) => console.error('Erreur lors de la modification de la ressource:', err)
      });
    } else {
      // Add new resource
      this.ressourcesService.addRessource(formData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée avec succès', response);
          this.router.navigate(['/ressources-coach']);
        },
        error: (err) => console.error('Erreur lors de l\'ajout de la ressource:', err)
      });
    }
  } else {
    console.error('Formulaire invalide');
  }
}



  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.ressourceForm.patchValue({ [controlName]: file });
    }
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  isImage(filePath: string): boolean {
    return filePath.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
  }
  
}
