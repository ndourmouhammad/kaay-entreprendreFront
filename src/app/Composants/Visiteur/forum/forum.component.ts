import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
  ForumComponent,
  Header1Component,
  FooterComponent,
  RouterLink,
  RouterModule
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

}
