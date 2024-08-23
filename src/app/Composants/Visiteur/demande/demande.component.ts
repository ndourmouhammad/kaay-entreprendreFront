import { SecteurActiviteModel } from './../../../Models/secteuractivite.model';
import { AuthService } from './../../../Services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SecteurActiviteService } from '../../../Services/secteurActivites.service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../Models/users.model';

@Component({
  selector: 'app-demande',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    RouterLink,
    CommonModule

  ],
  templateUrl: './demande.component.html',
  styleUrl: './demande.component.css'
})

export class DemandeComponent implements OnInit {

  private SecteurActiviteService= inject(SecteurActiviteService);



  //Declaration des Variables
  tabSecteurActivites: SecteurActiviteModel[] = [];
  tabUsers: UserModel[] = [];
  SecteurActiviteObject: SecteurActiviteModel = {};

  //Declaration des variables
  ngOnInit(): void {
    this.fetchSecteurActivite();
    this.fetchCoachs();
  }

// Recuperation de tous les Secteurs Activites

fetchSecteurActivite(){
  this.SecteurActiviteService.getAllActivites().subscribe(

    (response:any) =>{
      console.log(response.data);
      this.tabSecteurActivites = response.data.reverse();
    }
  )
}

// Recuperation de tous les coachs
fetchCoachs(){
  this.SecteurActiviteService.getAllCoachs().subscribe(
    (Response:any) =>{
      console.log(Response.data);
      this.tabUsers = Response.data.reverse();
    }

  )
}

}
