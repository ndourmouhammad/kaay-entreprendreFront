import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { GuideService } from '../../../Services/guide.service';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { environment } from '../../../../environnements/environments';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxEditorModule } from 'ngx-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtapeModalComponent } from '../etape-modal/etape-modal.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-guide-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,
    CommonModule,
    NgxEditorModule,
    EtapeModalComponent
  ],
  templateUrl: './guide-admin.component.html',
  styleUrls: ['./guide-admin.component.css']
})
export class GuideAdminComponent implements OnInit {
  guide: any;
  selectedEtape: any;
  baseUrl: string = environment.apiUrl;
  dropdownOpen = false;

  constructor(
    private guideService: GuideService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadGuide(1); 
  }

  loadGuide(id: number): void {
    this.guideService.getGuide(id).subscribe(response => {
      console.log('Guide data:', response);
      this.guide = response.data;  // Assigner les données du guide correctement
      if (this.guide.etapes && this.guide.etapes.length > 0) {
        this.selectedEtape = this.guide.etapes[0];
      }
    }, error => {
      console.error('Erreur lors de la récupération du guide:', error);
    });
  }

  showEtape(etape: any): void {
    if (etape === null) {
      // Ouvrir le modal pour ajouter une nouvelle étape
      this.openModal();
    } else {
      // Ouvrir le modal pour modifier l'étape sélectionnée
      this.openModal(etape);
    }
  }
  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectEtape(etape: any) {
    this.selectedEtape = etape;
    this.dropdownOpen = false;
  }

  setActiveStep(id: number): void {
    document.querySelectorAll('.step').forEach((step: any) => {
      step.classList.remove('active');
    });

    const activeStep = document.querySelector(`.step[data-id="${id}"]`);
    if (activeStep) {
      activeStep.classList.add('active');
    }
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    const element = document.getElementById('contentToConvert');

    if (element) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        doc.save('etape-details.pdf');
      }).catch(error => {
        console.error('Erreur lors de la conversion HTML en canvas :', error);
      });
    } else {
      console.error('Élément HTML non trouvé pour la conversion.');
    }
  }

  getFileUrl(filePath: string | undefined): string {
    return filePath ? `${this.baseUrl}${filePath}` : '';
  }

  openModal(etape: any = null): void {
    const modalRef = this.modalService.open(EtapeModalComponent);
    
    // Passer l'étape sélectionnée au modal si elle existe
    if (etape) {
      modalRef.componentInstance.etape = etape;
    }
  
    modalRef.result.then((result) => {
      if (result === 'submit') {
        // Actions après la soumission du formulaire dans le modal
        this.loadGuide(1); // Recharger les étapes si nécessaire
      }
    }).catch((error) => {
      // Actions en cas de fermeture du modal sans soumission
    });
  }
  

  // Supprimer une étape
  deleteEtape(id: number): void {
    // Afficher une alerte de confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas annuler cela!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, procéder à la suppression
        this.guideService.deleteEtape(id).subscribe(() => {
          Swal.fire(
            'Supprimé!',
            'L\'étape a été supprimée.',
            'success'
          );
          this.loadGuide(1); // Recharger les étapes après la suppression
        });
      }
    });
  }
  
}
