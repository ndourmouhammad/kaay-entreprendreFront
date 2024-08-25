import { Header1Component } from '../../Commun/header1/header1.component';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RessourceService } from '../../../Services/ressource.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import { environment } from '../../../../environnements/environments';

@Component({
  selector: 'app-detail-ressource',
  standalone: true,
  imports: [
    Header1Component,
    Header2Component,
    FooterComponent,CommonModule
  ],
  templateUrl: './detail-ressource.component.html',
  styleUrls: ['./detail-ressource.component.css']
})
export class DetailRessourceComponent implements OnInit {
  baseUrl: string = environment.apiUrl;
    photoUrl: string = '';

  ressource: any = {
    titre: "Titre de la ressource",
    description: "Description de la ressource",
    contenu: "Contenu détaillé de la ressource"
  };
  constructor(
    private ressourceService: RessourceService,
    private route: ActivatedRoute
  ) {}
  generatePDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(this.ressource.titre, 10, 10);

    doc.setFontSize(12);
    doc.text("Description:", 10, 20);
    doc.text(this.ressource.description, 10, 30);

    doc.text("Contenu:", 10, 40);
    doc.text(this.ressource.contenu, 10, 50);

    doc.save(`${this.ressource.titre}.pdf`);
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
  
    if (id) {
      this.ressourceService.getRessourceById(id).subscribe(
        (response: any) => {
         
          if (response && response.id && response.titre) {
            this.ressource = response;
          } else {
            console.error('Ressource non trouvée ou réponse invalide:', response);
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des détails de la ressource:', error.message);
        }
      );
    } else {
      console.error('ID de ressource non défini ou invalide');
    }
  }
  
  getPhotoUrl(photoPath: string): string {
    return `${this.baseUrl}${photoPath}`;
  }
  
}
