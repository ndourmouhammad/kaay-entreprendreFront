import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header1Component } from '../headerFooter/header1/header1.component';
import { Header2Component } from '../headerFooter/header2/header2.component';
import { FooterComponent } from '../headerFooter/footer/footer.component';

@Component({
  selector: 'app-detail-ressource',
  standalone: true,
  imports: [ RouterOutlet,Header1Component,Header2Component,FooterComponent],
  templateUrl: './detail-ressource.component.html',
  styleUrl: './detail-ressource.component.css'
})
export class DetailRessourceComponent {

}
