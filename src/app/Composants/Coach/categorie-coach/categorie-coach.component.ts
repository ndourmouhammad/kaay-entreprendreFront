// import { Component, OnInit, inject } from '@angular/core';
// import { HeaderCoachComponent } from '../header-coach/header-coach.component';
// import { CategorieService } from '../../../Services/categorie.service';
// import { CategorieModel } from '../../../Models/categories.model';
// import { NgFor } from '@angular/common';

// @Component({
//   selector: 'app-categorie-coach',
//   standalone: true,
//   imports: [
//     HeaderCoachComponent,
//     NgFor
//   ],
//   templateUrl: './categorie-coach.component.html',
//   styleUrl: './categorie-coach.component.css'
// })
// export class CategorieCoachComponent implements OnInit {

//   // Injection des dépépendances
//   private categorieService = inject(CategorieService)

//   categories: CategorieModel[] = []

//   ngOnInit(): void {
//     this.categorieService.getCategories().subscribe((data) => {
//       this.getCategories(data)
//     })
//   }

//   // lister les catégories
//   getCategories(data: any) {
//     console.log(data)
//     this.categories = data
//   }
  

// }

import { Component, OnInit, inject } from '@angular/core';
import { HeaderCoachComponent } from '../header-coach/header-coach.component';
import { CategorieService } from '../../../Services/categorie.service';
import { CategorieModel } from '../../../Models/categories.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categorie-coach',
  standalone: true,
  imports: [
    HeaderCoachComponent,
    NgFor
  ],
  templateUrl: './categorie-coach.component.html',
  styleUrls: ['./categorie-coach.component.css']
})
export class CategorieCoachComponent implements OnInit {

  private categorieService = inject(CategorieService);
  
  categories: CategorieModel[] = [];
  

  ngOnInit(): void {
    this.categorieService.getCategories().subscribe((response) => {
      this.getCategories(response.data); // Access the `data` property that contains the categories
    });
  }
  
  getCategories(data: CategorieModel[]) {
    this.categories = data;
  }
  

  getImagePath(titre: string): string {
    // Associez les titres des catégories aux images correspondantes
    const imagePaths: { [key: string]: string } = {
      'EdTech': '../../../../assets/dev.jpg',
      'E-Commerce': '../../../../assets/e-comm.jpg',
      'SaaS (Software as a Service)': '../../../../assets/sass.jpg'
    };

    return '../../../../assets/sass.jpg'; // default.jpg si titre non trouvé
  }

  
}
