import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { Header1Component } from './headerFooter/header1/header1.component';

import { RessourcesComponent } from './ressources/ressources.component';


import { Header2Component } from './headerFooter/header2/header2.component';
import { AccueilComponent } from './AccueilComponent/accueil/accueil.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    {path:'header1',component:Header1Component},

    {path:'ressources',component:RessourcesComponent},

    {path:'header2',component:Header2Component }


];
