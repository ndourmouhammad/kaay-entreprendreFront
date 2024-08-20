import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RetourExperienceService } from '../../../Services/retourExperience.service';
import { RetourExperienceModel } from '../../../Models/retourExperience.models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environnements/environments';

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
}