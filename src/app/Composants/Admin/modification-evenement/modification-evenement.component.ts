import { Component, OnInit } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvenementModel } from '../../../Models/evenements.model';
import { EvenementsService } from '../../../Services/evenements.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environnements/environments';


@Component({
  selector: 'app-modification-evenement',
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
  templateUrl: './modification-evenement.component.html',
  styleUrl: './modification-evenement.component.css'
})
// export class ModificationEvenementComponent {
//   evenementForm!: FormGroup;
//   evenementId!: number;
//   baseUrl: string = environment.apiUrl;
//     photoUrl: string = '';
    

//   constructor(
//     private fb: FormBuilder,
//     private evenementsService: EvenementsService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.evenementId = this.route.snapshot.params['id'];
//     this.initForm();
//     this.loadEvenementData();
//   }

//   initForm(): void {
//     this.evenementForm = this.fb.group({
//       theme: ['', Validators.required],
//       nombre_places: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
//       date_debut: ['', Validators.required],
//       date_fin: ['', Validators.required],
//       lieu: ['', Validators.required],
//       description: ['', Validators.required],
//       image: [''],
//       prix: ['', Validators.required]
//     });
//   }
  

//   loadEvenementData(): void {
//     this.evenementsService.getEvenement(this.evenementId).subscribe(
//       response => {
//         console.log('Données de l\'événement', response.data);
//         const evenement = response.data;
//         this.evenementForm.patchValue({
//           theme: evenement.theme,
//           nombre_places: evenement.nombre_places,
//           date_debut: evenement.date_debut.split(' ')[0], // Conversion au format "YYYY-MM-DD"
//           date_fin: evenement.date_fin.split(' ')[0], // Conversion au format "YYYY-MM-DD"
//           lieu: evenement.lieu,
//           prix: evenement.prix,
//           description: evenement.description,
//           image: evenement.image
//         });
//       },
//       error => {
//         console.error('Erreur lors du chargement des données de l\'événement', error);
//       }
//     );
//   }
  
  

//   onSubmit(): void {
//     if (this.evenementForm.valid) {
//       const formData = new FormData();
//       Object.keys(this.evenementForm.controls).forEach(key => {
//         const value = this.evenementForm.get(key)?.value;
//         if (value !== null && value !== undefined) {
//           formData.append(key, value);
//         }
//       });
  
//       this.evenementsService.updateEvenement(formData, this.evenementId).subscribe(
//         response => {
//           console.log('Événement modifié avec succès', response);
//           this.router.navigate(['/evenement-admin']);
//         },
//         error => {
//           console.error('Erreur lors de la modification de l\'événement', error);
//         }
//       );
//     } else {
//       console.log('Formulaire invalide');
//     }
//   }
  

//   onFileSelect(event: any): void {
//     const file = event.target.files[0];
//     this.evenementForm.patchValue({
//       image: file
//     });
//     this.evenementForm.get('image')?.updateValueAndValidity();
//   }
//   getPhotoUrl(photoPath: string): string {
//     return `${this.baseUrl}${photoPath}`;
//   }
// }
export class ModificationEvenementComponent {
  evenementForm!: FormGroup;
  evenementId!: number;
  baseUrl: string = environment.apiUrl;
  photoUrl: string = '';
  currentImage: string | null = null; // Variable pour l'image actuelle

  constructor(
    private fb: FormBuilder,
    private evenementsService: EvenementsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.evenementId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadEvenementData();
  }

  initForm(): void {
    this.evenementForm = this.fb.group({
      theme: ['', Validators.required],
      nombre_places: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      lieu: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      prix: ['', Validators.required]
    });
  }

  loadEvenementData(): void {
    this.evenementsService.getEvenement(this.evenementId).subscribe(
      response => {
        console.log('Données de l\'événement', response.data);
        const evenement = response.data;

        // Stocker l'image actuelle
        this.currentImage = evenement.image;
        this.photoUrl = this.getPhotoUrl(evenement.image);

        this.evenementForm.patchValue({
          theme: evenement.theme,
          nombre_places: evenement.nombre_places,
          date_debut: evenement.date_debut.split(' ')[0], // Conversion au format "YYYY-MM-DD"
          date_fin: evenement.date_fin.split(' ')[0], // Conversion au format "YYYY-MM-DD"
          lieu: evenement.lieu,
          prix: evenement.prix,
          description: evenement.description,
          image: '' // Vider le champ image pour l'instant
        });
      },
      error => {
        console.error('Erreur lors du chargement des données de l\'événement', error);
      }
    );
  }

  onSubmit(): void {
    if (this.evenementForm.valid) {
      const formData = new FormData();
  
      // Si une nouvelle image a été sélectionnée, l'ajouter à FormData
      const imageControl = this.evenementForm.get('image');
      if (imageControl?.value && typeof imageControl.value !== 'string') {
        formData.append('image', imageControl.value);
      } 
  
      // Ajouter les autres champs du formulaire
      Object.keys(this.evenementForm.controls).forEach(key => {
        if (key !== 'image') { // Ne pas doubler le champ image
          const value = this.evenementForm.get(key)?.value;
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        }
      });
  
      this.evenementsService.updateEvenement(formData, this.evenementId).subscribe(
        response => {
          console.log('Événement modifié avec succès', response);
          this.router.navigate(['/evenement-admin']);
        },
        error => {
          console.error('Erreur lors de la modification de l\'événement', error);
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

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
}
