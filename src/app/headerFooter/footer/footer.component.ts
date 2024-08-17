import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcceuilComponent } from '../../AccueilComponant/acceuil/acceuil.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterOutlet,AcceuilComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
