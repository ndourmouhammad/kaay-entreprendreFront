import { RouterLink, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Header1Component } from '../../Commun/header1/header1.component';
import { FooterComponent } from '../../Commun/footer/footer.component';


@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [
      GuideComponent,
      Header1Component,
      FooterComponent,
      RouterLink,
      RouterModule
  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent {

}
