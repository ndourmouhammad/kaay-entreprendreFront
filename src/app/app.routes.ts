import { Routes } from '@angular/router';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { RessourceComponent } from './Composants/Coach/ressource/ressource.component';
import { RessourceFormComponent } from './Composants/Coach/ressource-form/ressource-form.component';
import { RessourceDetailComponent } from './Composants/Coach/ressource-detail/ressource-detail.component';
import { CategorieCoachComponent } from './Composants/Coach/categorie-coach/categorie-coach.component';
import { EvenementCoachComponent } from './Composants/Coach/evenement-coach/evenement-coach.component';
import { DetailEvenementCoachComponent } from './Composants/Coach/detail-evenement-coach/detail-evenement-coach.component';
import { ProfilCoachComponent } from './Composants/Coach/profil-coach/profil-coach.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    { path: 'ressources-coach', component: RessourceComponent},
    { path: 'ressource-form', component: RessourceFormComponent},
    { path: 'ressource-details' , component: RessourceDetailComponent},
    { path: 'ressources-categorie', component: CategorieCoachComponent},
    { path: 'events-coach', component: EvenementCoachComponent},
    { path: 'events-details-coach', component: DetailEvenementCoachComponent},
    { path: 'profil-coach', component: ProfilCoachComponent}
];
