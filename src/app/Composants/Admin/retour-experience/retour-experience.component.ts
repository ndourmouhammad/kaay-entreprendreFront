import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RetourExperienceService } from '../../../Services/retourExperience.service';
import { RetourExperienceModel } from '../../../Models/retourExperience.models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environnements/environments';
import Swal from 'sweetalert2';
declare var bootstrap: any;



@Component({
  selector: 'app-retour-experience',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterModule,
    RouterLink,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './retour-experience.component.html',
  styleUrl: './retour-experience.component.css'
})
export class RetourExperienceComponent implements OnInit {

  retourExperience: RetourExperienceModel[] = [];
  baseUrl: string = environment.apiUrl;
  newRetourExperience: RetourExperienceModel = { libelle: '', contenu: '', image: '' };
  selectedFile: File | null = null;

  
 
  
  editRetourExperience: RetourExperienceModel = { id: 0, libelle: '', contenu: '', image: '' };
  
  editSelectedFile: File | null = null;

  constructor(private retourExperienceService: RetourExperienceService) {}

  ngOnInit(): void {
    this.getRetourExperience();
  }

  openModal() {
    const modalElement = document.getElementById('addRetourExperienceModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onAddRetourExperience() {
    if (!this.selectedFile) {
      console.error('No file selected!');
      return;
    }
  
    const formData = new FormData();
    formData.append('libelle', String(this.newRetourExperience.libelle));
    formData.append('contenu', String(this.newRetourExperience.contenu));
    formData.append('image', this.selectedFile as Blob);
  
    this.retourExperienceService.addRetourExperience(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.getRetourExperience();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.error && error.error.errors) {
          console.error('Validation Errors:', error.error.errors);
        }
      }
    });
  }
  
  

  closeModal() {
    const modalElement = document.getElementById('addRetourExperienceModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }

  getRetourExperience(): void {
    this.retourExperienceService.getRetourExperiences().subscribe((data) => {
      this.retourExperience = data.data;
    });
  }

  onDeleteRetourExperience(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action ne peut pas être annulée!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.retourExperienceService.deleteRetourExperience(id).subscribe({
          next: (response) => {
            Swal.fire(
              'Supprimé!',
              'L\'expérience a été supprimée.',
              'success'
            );
            this.getRetourExperience(); // Rafraîchir la liste après suppression
          },
          error: (error) => {
            Swal.fire(
              'Erreur!',
              'Il y a eu un problème lors de la suppression de l\'expérience.',
              'error'
            );
          }
        });
      }
    });
  }
  

 // Open the edit modal and populate it with the selected experience
 openEditModal(retour: RetourExperienceModel) {
  this.editRetourExperience = { ...retour };
  const modalElement = document.getElementById('editRetourExperienceModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Handle file selection for the edit modal
onEditFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.editSelectedFile = input.files[0];
    console.log('File type:', this.editSelectedFile.type);  // Check the MIME type
  }
}


onUpdateRetourExperience() {
  const formData = new FormData();
  formData.append('libelle', String(this.editRetourExperience.libelle));
  formData.append('contenu', String(this.editRetourExperience.contenu));

  if (this.editSelectedFile) {
    formData.append('image', this.editSelectedFile as Blob);
  }

  // Include the ID if your backend expects it as part of the form data
  formData.append('id', String(this.editRetourExperience.id));

  // Call the service method with the FormData
  this.retourExperienceService.updateRetourExperience(formData).subscribe({
    next: (response) => {
      console.log('Experience updated:', response.message);
      this.getRetourExperience(); // Refresh the list
      this.closeEditModal(); // Close the modal
    },
    error: (error) => {
      console.error('Error updating experience:', error);
      if (error.error && error.error.errors) {
        console.error('Validation Errors:', error.error.errors);
      }
    }
  });
}


closeEditModal() {
  const modalElement = document.getElementById('editRetourExperienceModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  modal.hide();
}


}