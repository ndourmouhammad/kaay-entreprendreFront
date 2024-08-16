import { Routes } from '@angular/router';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { RessourceComponent } from './Composants/Coach/ressource/ressource.component';
import { RessourceFormComponent } from './Composants/Coach/ressource-form/ressource-form.component';
import { RessourceDetailComponent } from './Composants/Coach/ressource-detail/ressource-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    { path: 'ressources-coach', component: RessourceComponent},
    { path: 'ressource-form', component: RessourceFormComponent},
    { path: 'ressource-details' , component: RessourceDetailComponent}
];
