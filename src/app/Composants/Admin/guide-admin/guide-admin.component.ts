import { RouterLink, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GuideService } from '../../../Services/guide.service';
import { EtapeService } from '../../../Services/etape.service';
import { CommonModule } from '@angular/common';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { environment } from '../../../../environnements/environments';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-guide-admin',
  standalone: true,
  imports: [
    HeaderAdminComponent,
    RouterLink,
    RouterModule,CommonModule
  ],
  templateUrl: './guide-admin.component.html',
  styleUrl: './guide-admin.component.css'
})
export class GuideAdminComponent implements OnInit{
  guide: any;
  selectedEtape: any;
  baseUrl: string = environment.apiUrl;
  dropdownOpen = false;
    

  constructor(
    private guideService: GuideService,
    private etapeService: EtapeService
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
    this.selectedEtape = etape;
    console.log('Étape sélectionnée:', this.selectedEtape);  // Ajouter ceci pour déboguer
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
}
