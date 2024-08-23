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
        console.log('Full Response:', response);
        if (response) {  // Assuming the response itself is the resource
          console.log('Ressource:', response);
          this.ressourceForm.patchValue(response);
        } else {
          console.error('Ressource data is undefined');
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
    Object.keys(this.ressourceForm.controls).forEach(key => {
      formData.append(key, this.ressourceForm.get(key)?.value || '');
    });

    if (this.isEditMode && this.currentResourceId) {
      // Convert the resource ID to a number if it's a string
      const resourceId = Number(this.currentResourceId);

      // Ensure resourceId is a valid number before calling the update method
      if (!isNaN(resourceId)) {
        // Adjust the parameter order to match your service method
        // If your service expects formData first, change the order accordingly
        this.ressourcesService.updateRessource(formData, resourceId).subscribe({
          next: (response) => {
            console.log('Ressource modifiée:', response);
            this.router.navigate(['/ressources-coach']);
          },
          error: (err) => console.error('Erreur lors de la modification de la ressource:', err)
        });
      } else {
        console.error('Invalid resource ID');
      }
    } else {
      // Ajouter une nouvelle ressource
      this.ressourcesService.addRessource(formData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée:', response);
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
}
