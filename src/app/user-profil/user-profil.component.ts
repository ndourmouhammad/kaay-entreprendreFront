import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from '../headerFooter/header2/header2.component';
import { FooterComponent } from '../headerFooter/footer/footer.component';

@Component({
  selector: 'app-user-profil',
  standalone: true,
  imports: [ RouterOutlet,Header2Component,FooterComponent],
  templateUrl: './user-profil.component.html',
  styleUrl: './user-profil.component.css'
})
export class UserProfilComponent {

}
