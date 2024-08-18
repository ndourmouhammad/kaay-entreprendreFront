import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { RetourExperienceComponent } from './Composants/Entrepreneur/retour-experience/retour-experience.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    { path: 'retourexperience', component: RetourExperienceComponent}

];
