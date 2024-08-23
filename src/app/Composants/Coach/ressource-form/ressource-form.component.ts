import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  // Injection des dépendances
  private ressourcesService = inject(RessourcesService);
  private categorieService = inject(CategorieService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ressourceForm: FormGroup;
  categories: CategorieModel[] = [];

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

  // Méthode pour soumettre le formulaire
  onSubmit(): void {
    if (this.ressourceForm.valid) {
      const formData = new FormData();
      Object.keys(this.ressourceForm.controls).forEach(key => {
        formData.append(key, this.ressourceForm.get(key)?.value || ''); // Utilisation de l'opérateur de navigation sécurisée
      });
  
      this.ressourcesService.addRessource(formData).subscribe({
        next: (response) => {
          console.log('Ressource ajoutée:', response);
          // Redirection vers la page des ressources
          this.router.navigate(['/ressources-coach']);
        },
        error: (err) => console.error('Erreur lors de l\'ajout de la ressource:', err)
      });
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
