import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout-evenement',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ajout-evenement.component.html',
  styleUrl: './ajout-evenement.component.css'
})
export class AjoutEvenementComponent implements OnInit {
  evenementForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private evenementsService: EvenementsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.evenementForm = this.fb.group({
      theme: ['', Validators.required],
      nombre_places: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      lieu: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required],
      prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      const formData = new FormData();
      
      // Ajoutez chaque champ du formulaire au FormData
      Object.keys(this.evenementForm.controls).forEach(key => {
        formData.append(key, this.evenementForm.get(key)?.value);
      });

      this.evenementsService.addEvenement(formData).subscribe(
        response => {
          console.log('Événement ajouté avec succès', response);
          this.router.navigate(['/evenement-admin']);
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'événement', error);
          console.log('Détails de l\'erreur:', error.error); // Pour plus de détails sur l'erreur
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    this.evenementForm.patchValue({
      image: file
    });
    this.evenementForm.get('image')?.updateValueAndValidity();
  }
}
