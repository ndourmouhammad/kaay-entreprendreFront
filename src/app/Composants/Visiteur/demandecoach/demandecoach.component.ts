
import { FooterComponent } from '../../Commun/footer/footer.component';
import { Header1Component } from '../../Commun/header1/header1.component';
import { AuthService } from './../../../Services/auth.service';
import { Component, inject, OnInit } from '@angular/core';


FooterComponent

@Component({
  selector: 'app-demandecoach',
  standalone: true,
  imports: [
    Header1Component,
    FooterComponent
  ],
  templateUrl: './demandecoach.component.html',
  styleUrl: './demandecoach.component.css'
})
export class DemandecoachComponent implements OnInit{

  users: any[] = []; 
  coach: any; 
private AuthService = inject(AuthService);


// Declaration de la methode
ngOnInit(): void {
  this.fetchCoachs();
}

  //Recuperation de=u profil coach
  fetchCoachs(){
    this.AuthService.getProfilCoach().subscribe(
      (Response:any) =>{
        console.log(Response.data.reverse());
        ;

      }
    )
  }
}
