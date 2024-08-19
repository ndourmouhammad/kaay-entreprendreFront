import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { Header2Component } from '../../Commun/header2/header2.component';
import { FooterComponent } from '../../Commun/footer/footer.component';

@Component({
  selector: 'app-detail-ressource',
  standalone: true,
  imports: [ 
    Header1Component,
    Header2Component,
    FooterComponent
  ],
  templateUrl: './detail-ressource.component.html',
  styleUrl: './detail-ressource.component.css'
})
export class DetailRessourceComponent {

}
