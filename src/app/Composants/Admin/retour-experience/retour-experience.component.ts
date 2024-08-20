import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterLink, RouterModule } from '@angular/router';
import { RetourExperienceService } from '../../../Services/retourExperience.service';
import { RetourExperienceModel } from '../../../Models/retourExperience.models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environnements/environments';


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

  private retourExperienceService = inject(RetourExperienceService);

  ngOnInit(): void {
    this.getRetourExperience();
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
