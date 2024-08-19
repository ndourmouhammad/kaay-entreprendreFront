import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-detail-forum',
  standalone: true,
  imports: [
    DetailForumComponent,
    Header1Component,
    FooterComponent,
    RouterLink,
    RouterModule
  ],
  templateUrl: './detail-forum.component.html',
  styleUrl: './detail-forum.component.css'
})
export class DetailForumComponent {

}
