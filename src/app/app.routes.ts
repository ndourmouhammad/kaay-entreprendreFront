import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent}
    
];
