import { Routes } from '@angular/router';
import { HeaderCoachComponent } from './Composants/Coach/header-coach/header-coach.component';
import { DashboardCoachComponent } from './Composants/Coach/dashboard-coach/dashboard-coach.component';
import { Header1Component } from './headerFooter/header1/header1.component';
import { FooterComponent } from './headerFooter/footer/footer.component';
import { DetailRessourceComponent } from './detail-ressource/detail-ressource.component';

export const routes: Routes = [
    { path: '', redirectTo: 'visiteur', pathMatch: 'full' },
    { path: 'dashboard-coach', component: DashboardCoachComponent},
    {path:'header1',component:Header1Component},
    {path:'footer',component:FooterComponent},
    {path:'detail',component:DetailRessourceComponent}


    
];
