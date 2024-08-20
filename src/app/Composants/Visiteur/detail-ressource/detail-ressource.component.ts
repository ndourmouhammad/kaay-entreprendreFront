import { Header1Component } from '../../Commun/header1/header1.component';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { RessourceService } from '../../../Services/ressource.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


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
  ressource: any;

  constructor(
    private ressourceService: RessourceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
  
    if (id) {
      this.ressourceService.getRessourceById(id).subscribe(
        (response: any) => {
          // Vérifiez si la réponse contient les propriétés attendues
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
  
  
  
}
