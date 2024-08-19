import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Header1Component } from './headerFooter/header1/header1.component';
// import { FooterComponent } from './headerFooter/footer/footer.component';
// import { Header2Component } from './headerFooter/header2/header2.component';
// import { AcceuilComponent } from './AccueilComponant/acceuil/acceuil.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kaay-entreprendre-front';
}
