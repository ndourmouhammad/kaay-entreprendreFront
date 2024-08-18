import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2Component } from '../headerFooter/header2/header2.component';
import { FooterComponent } from '../headerFooter/footer/footer.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [ RouterOutlet,Header2Component,FooterComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

}
